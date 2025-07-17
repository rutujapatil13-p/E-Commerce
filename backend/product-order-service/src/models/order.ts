import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import OrderItem from  '../models/orderItems';

class Order extends Model {
  public id!: number;
  public customer_id!: number;
  public total_amount!: number;
  public status!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

export default Order;