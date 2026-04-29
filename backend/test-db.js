const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '.env');
console.log(`Diagnostic: envPath is ${envPath}`);
console.log(`Diagnostic: .env exists: ${fs.existsSync(envPath)}`);

require('dotenv').config(); // Should find it in root

console.log(`Diagnostic: DB_PASSWORD is type ${typeof process.env.DB_PASSWORD}`);
console.log(`Diagnostic: DB_PASSWORD is defined: ${process.env.DB_PASSWORD !== undefined}`);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Diagnostic error:', err);
    } else {
        console.log('Diagnostic success:', res.rows[0]);
    }
    process.exit();
});
