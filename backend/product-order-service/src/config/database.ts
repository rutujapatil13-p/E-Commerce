import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PRODUCT_DB_HOST || 'localhost',
  port: parseInt(process.env.PRODUCT_DB_PORT || '5432'),
  database: process.env.PRODUCT_DB_NAME || 'product_order_db',
  username: process.env.PRODUCT_DB_USER || 'postgres',
  password: process.env.PRODUCT_DB_PASSWORD || 'password',
});

export default sequelize;