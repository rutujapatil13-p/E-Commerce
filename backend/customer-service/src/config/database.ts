import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.CUSTOMER_DB_HOST || 'localhost',
  port: parseInt(process.env.CUSTOMER_DB_PORT || '5432'),
  database: process.env.CUSTOMER_DB_NAME || 'customer_db',
  username: process.env.CUSTOMER_DB_USER || 'postgres',
  password: process.env.CUSTOMER_DB_PASSWORD || 'password',
});

export default sequelize;