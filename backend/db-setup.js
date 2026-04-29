const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const setupDatabase = async () => {
    // 1. Connect to the default 'postgres' database to create 'ecommerce_saga'
    const defaultPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: 'postgres' // Connect to default DB
    });

    try {
        console.log(`Checking if database ${process.env.DB_NAME} exists...`);
        const res = await defaultPool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_NAME}'`);
        
        if (res.rowCount === 0) {
            console.log(`Creating database ${process.env.DB_NAME}...`);
            await defaultPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('Database created successfully.');
        } else {
            console.log('Database already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await defaultPool.end();
    }

    // 2. Connect to the newly created 'ecommerce_saga' database to run schema and seeds
    const appPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });

    try {
        console.log('Running schema.sql...');
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await appPool.query(schemaSql);
        console.log('Schema created successfully.');

        console.log('Running seed.sql...');
        const seedPath = path.join(__dirname, '../database/seed.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await appPool.query(seedSql);
        console.log('Data seeded successfully.');

    } catch (err) {
        console.error('Error running setup scripts:', err);
    } finally {
        await appPool.end();
    }
};

setupDatabase();
