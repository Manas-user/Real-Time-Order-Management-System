-- PostgreSQL Schema for Real-Time Order Processing System

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- PRODUCTS TABLE
-- Product information only (stock handled by inventory table)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- INVENTORY TABLE
-- Handles real stock values for concurrency-safe operations
CREATE TABLE IF NOT EXISTS inventory (
    product_id INT PRIMARY KEY,
    available_stock INT NOT NULL DEFAULT 0,
    reserved_stock INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    status VARCHAR(50) DEFAULT 'Pending',
    total_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- ORDER ITEMS TABLE
-- Supports multiple products per order
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2),

    CONSTRAINT fk_orderitems_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_orderitems_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

-- PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

-- INDEXES FOR PERFORMANCE

-- Orders lookup by user
CREATE INDEX IF NOT EXISTS idx_orders_user_id 
ON orders(user_id);

-- Orders lookup by status
CREATE INDEX IF NOT EXISTS idx_orders_status 
ON orders(status);

-- Order items lookup
CREATE INDEX IF NOT EXISTS idx_order_items_order_id 
ON order_items(order_id);

-- Payments lookup
CREATE INDEX IF NOT EXISTS idx_payments_order_id 
ON payments(order_id);

-- Inventory lookup
CREATE INDEX IF NOT EXISTS idx_inventory_product_id
ON inventory(product_id);