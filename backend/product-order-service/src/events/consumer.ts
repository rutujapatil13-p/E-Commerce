import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const exchange = 'ecommerce_events';
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const queue = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue.queue, exchange, 'customer.updated');
    channel.consume(queue.queue, (msg) => {
      if (msg) {
        console.log('Received customer update:', JSON.parse(msg.content.toString()));
        // Handle customer updates if needed
      }
    });
    console.log('Product & Order Service consumer started');
  } catch (error) {
    console.error('Consumer error:', error);
  }
}