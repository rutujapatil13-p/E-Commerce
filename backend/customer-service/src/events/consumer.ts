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
    await channel.bindQueue(queue.queue, exchange, 'order.created');
    channel.consume(queue.queue, (msg) => {
      if (msg) {
        console.log('Received order created:', JSON.parse(msg.content.toString()));
        // Handle order creation (e.g., notify customer)
      }
    });
    console.log('Customer Service consumer started');
  } catch (error) {
    console.error('Consumer error:', error);
  }
}