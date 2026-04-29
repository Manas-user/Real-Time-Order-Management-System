import React from 'react';
import { Calendar, Package, DollarSign, CreditCard, Clock, CheckCircle2 } from 'lucide-react';

const OrderStatusCard = ({ order }) => {
    if (!order) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'delivered') return 'bg-green-100 text-green-700 border-green-300';
        if (s === 'shipped' || s === 'processing') return 'bg-blue-100 text-blue-700 border-blue-300';
        if (s === 'payment failed' || s === 'cancelled') return 'bg-red-100 text-red-700 border-red-300';
        return 'bg-amber-100 text-amber-700 border-amber-300';
    };

    return (
        <div className="order-status-card">
            <div className="order-status-card-header">
                <div className="order-status-info">
                    <h3 className="order-status-label">Order ID</h3>
                    <p className="order-status-id">#{order.order_id}</p>
                </div>
                <div className={`status-badge ${getStatusStyle(order.order_status)}`}>
                    {order.order_status}
                </div>
            </div>

            <div className="order-status-grid">
                <div className="order-status-section">
                    <div className="order-detail-item">
                        <div className="detail-icon" style={{ background: 'linear-gradient(135deg, rgba(26, 127, 126, 0.15), rgba(32, 178, 170, 0.15))', color: 'var(--primary)' }}>
                            <Package size={24} />
                        </div>
                        <div>
                            <h4 className="detail-label">Product Details</h4>
                            <p className="detail-title">{order.product_name}</p>
                            <p className="detail-text">Quantity: <span className="detail-value">{order.quantity} units</span></p>
                        </div>
                    </div>

                    <div className="order-detail-item">
                        <div className="detail-icon" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 107, 107, 0.1))', color: 'var(--accent-sale)' }}>
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h4 className="detail-label">Total Price</h4>
                            <p className="detail-price">${parseFloat(order.total_price).toFixed(2)}</p>
                            <div className="payment-status-row">
                                <CreditCard size={14} />
                                <span className="detail-text">Payment: </span>
                                <span className={`payment-badge ${order.payment_status?.toLowerCase() === 'completed' ? 'completed' : 'pending'}`}>
                                    {order.payment_status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-status-section">
                    <div className="order-detail-item">
                        <div className="detail-icon" style={{ background: 'linear-gradient(135deg, rgba(26, 127, 126, 0.1), rgba(32, 178, 170, 0.1))', color: 'var(--primary)' }}>
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h4 className="detail-label">Order Date</h4>
                            <p className="detail-title">{formatDate(order.created_at)}</p>
                            <p className="detail-text italic">Order timestamp</p>
                        </div>
                    </div>

                    <div className="order-detail-item">
                        <div className="detail-icon" style={{ background: 'linear-gradient(135deg, rgba(26, 127, 126, 0.15), rgba(32, 178, 170, 0.15))', color: 'var(--primary)' }}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="detail-label">Current Status</h4>
                            <p className="detail-title">{order.order_status}</p>
                            <div className="live-tracking">
                                <CheckCircle2 size={14} />
                                <span>Live Tracking Enabled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusCard;
