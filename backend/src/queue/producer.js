const { getChannel } = require('../config/rabbitmq');

const publishToQueue = async (queueName, data) => {
    const channel = getChannel();
    if (!channel) {
        console.error('RabbitMQ channel not available');
        return;
    }

    try {
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
            persistent: true
        });
        console.log(`[x] Sent event to ${queueName}`);
    } catch (error) {
        console.error('Error publishing to queue:', error);
    }
};

module.exports = { publishToQueue };
