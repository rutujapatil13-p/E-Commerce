import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Product from './product';

class OrderItem extends Model {
  public id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price_at_time!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: { model: 'orders', key: 'id' },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: { model: 'products', key: 'id' },
      onDelete: 'RESTRICT',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_at_time: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default OrderItem;