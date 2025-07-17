import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export async function publishEvent(eventType: string, data: any) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const exchange = 'ecommerce_events';
    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, eventType, Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Failed to publish event:', error);
  }
}