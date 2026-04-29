import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, RefreshCw, ChevronLeft, AlertCircle } from 'lucide-react';
import { orderService } from '../services/api';
import OrderStatusCard from '../components/OrderStatusCard';
import OrderProgressTracker from '../components/OrderProgressTracker';

const OrderStatus = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lookupId, setLookupId] = useState(orderId || '');

    useEffect(() => {
        if (orderId) {
            fetchOrderStatus(orderId);
            setLookupId(orderId);
        }
    }, [orderId]);

    const fetchOrderStatus = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrderStatus(id);
            setOrder(response.data);
        } catch (err) {
            console.error("Fetch order status error:", err);
            // Handling non-JSON responses or explicit errors
            const message = err.response?.data?.message || err.message || "Connection failure";
            setError(err.response?.status === 404
                ? "Order not found. Please check your order ID."
                : `Error: ${message}`);
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLookup = (e) => {
        e.preventDefault();
        if (lookupId.trim()) {
            navigate(`/order-status/${lookupId.trim()}`);
        }
    };

    return (
        <div className="order-status-page">
            <header className="order-status-header">
                <div className="container">
                    <div className="order-status-header-content">
                        <h1 className="order-status-title">Track Your Order</h1>
                        <p className="order-status-subtitle">
                            Get real-time updates on your purchase and follow its journey to your doorstep.
                        </p>
                    </div>
                </div>
            </header>

            <main className="order-status-main">
                <div className="order-status-container">
                    {/* Lookup Section */}
                    <div className="order-lookup-card">
                        <form onSubmit={handleLookup} className="order-lookup-form">
                            <div className="order-lookup-input-wrapper">
                                <Search className="order-lookup-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Enter your Order ID (e.g. ORD-123456)"
                                    value={lookupId}
                                    onChange={(e) => setLookupId(e.target.value)}
                                    className="order-lookup-input"
                                />
                            </div>
                            <button
                                type="submit"
                                className="order-lookup-btn"
                                disabled={loading || !lookupId.trim()}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Track Order"}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    {loading ? (
                        <div className="flex flex-col items-center py-20 animate-pulse">
                            <Loader2 className="animate-spin text-primary mb-4" size={48} />
                            <p className="text-slate-500 font-medium">Retrieving real-time order data...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-10 text-center animate-fade-in">
                            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                            <h3 className="text-xl font-bold text-red-900 mb-2">Tracking Failed</h3>
                            <p className="text-red-700 max-w-md mx-auto">{error}</p>
                            <button
                                onClick={() => navigate('/order-status')}
                                className="mt-6 text-primary font-bold underline"
                            >
                                Try checking another ID
                            </button>
                        </div>
                    ) : order ? (
                        <div className="space-y-12 animate-fade-in">
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-2xl font-extrabold text-slate-900">Current Progress</h3>
                                <button
                                    onClick={() => fetchOrderStatus(orderId)}
                                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    <RefreshCw size={18} />
                                    Refresh Status
                                </button>
                            </div>

                            <div className="tracker-container">
                                <OrderProgressTracker currentStatus={order.order_status} />
                            </div>

                            <OrderStatusCard order={order} />
                        </div>
                    ) : (
                        <div className="status-placeholder">
                            <Search size={80} />
                            <h3 className="text-2xl font-bold text-slate-400">Ready to track?</h3>
                            <p className="text-slate-400 mt-2">Enter an order ID above to see the status.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrderStatus;
