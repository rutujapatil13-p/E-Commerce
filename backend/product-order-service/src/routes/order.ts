import express from 'express';
import sequelize from '../config/database';
import Product from '../models/product';
import Order from '../models/order';
import OrderItem from '../models/orderItems';
import { publishEvent } from '../events/publisher';

const router = express.Router();

// Create an order
router.post('/', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { customer_id, items } = req.body; // items: [{ product_id, quantity }]

    // Calculate total and check stock
    let total_amount = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction });
      if (!product || product.stock_quantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Insufficient stock or invalid product' });
      }
      total_amount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create(
      { customer_id, total_amount, status: 'pending' },
      { transaction }
    );

    // Create order items and update stock
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction });
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_time: product!.price,
        },
        { transaction }
      );
      await product!.update(
        { stock_quantity: product!.stock_quantity - item.quantity },
        { transaction }
      );
    }

    await transaction.commit();

    // Publish OrderCreated event
    await publishEvent('order.created', {
      order_id: order.id,
      customer_id,
      total_amount,
      items,
    });

    res.status(201).json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;