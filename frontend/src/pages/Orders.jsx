import React from 'react';
import { motion } from 'framer-motion';
import OrderStatus from '../components/OrderStatus';
import { History } from 'lucide-react';

const Orders = () => {
    const dummyOrders = [
        { id: 'ORD-829312', productName: 'Neural Link v2', quantity: 1, status: 'Processing' },
        { id: 'ORD-742911', productName: 'Quantum Slate', quantity: 2, status: 'Shipped' },
        { id: 'ORD-123456', productName: 'Aero Hoverpad', quantity: 1, status: 'Pending' },
    ];

    return (
        <div className="orders-page">
            <header className="orders-page-header">
                <div className="container">
                    <div className="orders-header-content">
                        <div className="orders-header-icon">
                            <History size={32} />
                        </div>
                        <div>
                            <h1 className="orders-title">Your Orders</h1>
                            <p className="orders-subtitle">Track the progress of your real-time orders below.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '3rem 1.5rem' }}>
                <div className="orders-grid">
                    {dummyOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <OrderStatus order={order} />
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Orders;
