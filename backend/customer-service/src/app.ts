import express from 'express';
import customerRouter from './routes/customer';
import { startConsumer } from './events/consumer';

const app = express();

app.use(express.json());
app.use('/customers', customerRouter);

startConsumer();

export default app;