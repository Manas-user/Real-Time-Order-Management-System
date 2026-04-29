const amqp = require('amqplib');
require('dotenv').config();

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');

        // Ensure queues exist
        await channel.assertQueue('order_created', { durable: true });
        await channel.assertQueue('payment_success', { durable: true });

        return { connection, channel };
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
        console.warn('Backend will continue without RabbitMQ');
    }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
