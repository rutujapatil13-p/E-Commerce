import express from 'express';
import bcrypt from 'bcrypt';
import Customer from '../models/customer';
import { publishEvent } from '../events/publisher';

const router = express.Router();

// Register a customer
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address,
    });

    // Publish CustomerCreated event
    await publishEvent('customer.created', {
      id: customer.id,
      first_name,
      last_name,
      email,
      address,
    });

    res.status(201).json({ id: customer.id, email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register customer' });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

export default router;