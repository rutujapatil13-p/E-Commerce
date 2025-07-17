import express from 'express';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { startConsumer } from './events/consumer';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/orders', orderRouter);

startConsumer();

export default app;