-- Seed Data for Real-Time Order Processing System

-- Reset all tables
TRUNCATE TABLE payments, order_items, orders, inventory, products, users RESTART IDENTITY CASCADE;

---------------------------------------------------
-- USERS (30 Indian users)
---------------------------------------------------

INSERT INTO users (name, email) VALUES
('Aarav Sharma','aarav.sharma@gmail.com'),
('Vivaan Patel','vivaan.patel@gmail.com'),
('Aditya Verma','aditya.verma@gmail.com'),
('Arjun Singh','arjun.singh@gmail.com'),
('Sai Kumar','sai.kumar@gmail.com'),
('Rohan Mehta','rohan.mehta@gmail.com'),
('Kabir Jain','kabir.jain@gmail.com'),
('Yash Gupta','yash.gupta@gmail.com'),
('Rahul Nair','rahul.nair@gmail.com'),
('Karan Malhotra','karan.malhotra@gmail.com'),
('Ananya Iyer','ananya.iyer@gmail.com'),
('Diya Kapoor','diya.kapoor@gmail.com'),
('Ishita Shah','ishita.shah@gmail.com'),
('Sneha Kulkarni','sneha.kulkarni@gmail.com'),
('Pooja Desai','pooja.desai@gmail.com'),
('Neha Joshi','neha.joshi@gmail.com'),
('Riya Agarwal','riya.agarwal@gmail.com'),
('Aditi Mishra','aditi.mishra@gmail.com'),
('Meera Reddy','meera.reddy@gmail.com'),
('Priya Menon','priya.menon@gmail.com'),
('Akash Bansal','akash.bansal@gmail.com'),
('Manish Tiwari','manish.tiwari@gmail.com'),
('Nikhil Saxena','nikhil.saxena@gmail.com'),
('Siddharth Rao','siddharth.rao@gmail.com'),
('Harsh Vardhan','harsh.vardhan@gmail.com'),
('Varun Khanna','varun.khanna@gmail.com'),
('Deepak Choudhary','deepak.choudhary@gmail.com'),
('Rakesh Yadav','rakesh.yadav@gmail.com'),
('Vikram Shetty','vikram.shetty@gmail.com'),
('Gaurav Arora','gaurav.arora@gmail.com');

---------------------------------------------------
-- PRODUCTS (12 products)
---------------------------------------------------

INSERT INTO products (name, price, category, image_url) VALUES
('Quantum Slate Tablet', 899.99, 'Electronics', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'),
('Neural Link Headset', 299.00, 'Electronics', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800'),
('Vortex Smart Watch', 199.50, 'Accessories', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800'),
('Nebula Gaming Console', 499.00, 'Electronics', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800'),
('Apex Wireless Earbuds', 149.99, 'Accessories', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'),
('Nova Mechanical Keyboard', 129.99, 'Office', 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'),
('Orbit Wireless Mouse', 59.99, 'Office', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'),
('Zenith 4K Monitor', 399.99, 'Electronics', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'),
('Photon Gaming Laptop', 1299.00, 'Electronics', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800'),
('Titan External SSD', 249.00, 'Storage', 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=800'),
('Echo Smart Speaker', 179.99, 'Electronics', 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=800'),
('Fusion VR Headset', 599.99, 'Gaming', 'https://images.unsplash.com/photo-1617802690992-15d9326e640c?auto=format&fit=crop&q=80&w=800');

---------------------------------------------------
-- INVENTORY
---------------------------------------------------

INSERT INTO inventory (product_id, available_stock, reserved_stock) VALUES
(1, 50, 0),
(2, 100, 0),
(3, 75, 0),
(4, 30, 0),
(5, 120, 0),
(6, 60, 0),
(7, 90, 0),
(8, 25, 0),
(9, 20, 0),
(10, 70, 0),
(11, 80, 0),
(12, 15, 0);

---------------------------------------------------
-- ORDERS (60 orders generated automatically)
---------------------------------------------------

INSERT INTO orders (user_id, total_price, status)
SELECT
    (random()*29 + 1)::INT,
    (random()*1000 + 100)::NUMERIC(10,2),
    CASE
        WHEN random() < 0.25 THEN 'Pending'
        WHEN random() < 0.50 THEN 'Processing'
        WHEN random() < 0.75 THEN 'Paid'
        ELSE 'Completed'
    END
FROM generate_series(1,60);

---------------------------------------------------
-- ORDER ITEMS (90 items)
---------------------------------------------------

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
SELECT
    (random()*59 + 1)::INT,
    (random()*11 + 1)::INT,
    (random()*2 + 1)::INT,
    (random()*1000 + 50)::NUMERIC(10,2)
FROM generate_series(1,90);

---------------------------------------------------
-- PAYMENTS (60 payments)
---------------------------------------------------

INSERT INTO payments (order_id, amount, status, transaction_id)
SELECT
    id,
    total_price,
    CASE
        WHEN random() < 0.7 THEN 'Completed'
        WHEN random() < 0.9 THEN 'Pending'
        ELSE 'Failed'
    END,
    'TXN' || floor(random()*1000000)
FROM orders;