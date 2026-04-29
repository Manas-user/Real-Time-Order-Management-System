const path = require('path');
const fs = require('fs');
const envPath = path.join(__dirname, '../.env');
console.log(`Checking .env at: ${envPath}`);
console.log(`File exists: ${fs.existsSync(envPath)}`);

require('dotenv').config({ path: envPath });
console.log(`Loaded DB_USER: ${process.env.DB_USER}`);
console.log(`Loaded DB_PASSWORD type: ${typeof process.env.DB_PASSWORD}`);

const app = require('./app');
const { connectRabbitMQ } = require('./config/rabbitmq');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Initialize RabbitMQ
        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
