import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Loader2, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { paymentService, orderService } from '../services/api';

const Payment = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await orderService.getOrderStatus(orderId);
                setOrder(response.data);
            } catch (err) {
                console.error("Failed to fetch order details", err);
                setError("Could not retrieve order details.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handlePayment = async () => {
        setProcessing(true);
        setError(null);
        try {
            const response = await paymentService.processPayment(orderId);
            const { status } = response.data;
            
            if (status === 'Completed') {
                navigate(`/order-status/${orderId}`, { state: { paymentSuccess: true } });
            } else {
                setError("Payment was declined or failed. Please try again.");
            }
        } catch (err) {
            console.error("Payment failed", err);
            setError("A network or server error occurred during processing.");
        } finally {
            setProcessing(false);
        }
    };

    if (error) {
        return (
            <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                    <XCircle size={64} style={{ color: '#dc2626', margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 'bold' }}>Payment Error</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                    <button onClick={() => window.location.reload()} className="btn-primary-large" style={{ width: '100%', justifyContent: 'center' }}>
                        Try Again
                    </button>
                    <button onClick={() => navigate('/products')} className="btn-secondary-large" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                        Return to Shop
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container loading-state">
                <Loader2 className="animate-spin text-primary" size={48} style={{ margin: '0 auto 1rem' }} />
                <p>Loading payment details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                    <XCircle size={64} style={{ color: '#dc2626', margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 'bold' }}>Order Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                    <button onClick={() => navigate('/products')} className="btn-primary-large" style={{ width: '100%', justifyContent: 'center' }}>
                        Return to Shop
                    </button>
                </div>
            </div>
        );
    }

    if (order.order_status !== 'Pending') {
        return (
            <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                    <CheckCircle size={64} style={{ color: '#22c55e', margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 'bold' }}>Order Already Processed</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>This order's payment has already been handled.</p>
                    <button onClick={() => navigate(`/order-status/${orderId}`)} className="btn-primary-large" style={{ width: '100%', justifyContent: 'center' }}>
                        View Order Status
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <header className="payment-header">
                <div className="container">
                    <h1 className="payment-title">Secure Checkout</h1>
                    <p className="payment-subtitle">
                        Complete your payment for Order #{orderId}
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '3rem 1.5rem' }}>
                <div className="steps-container" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: '#22c55e' }}>
                                <CheckCircle size={20} />
                            </div>
                            <div className="step-line" style={{ background: '#22c55e' }}></div>
                        </div>
                        <span className="step-title">Review</span>
                    </div>
                    
                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: 'var(--primary)' }}>2</div>
                            <div className="step-line"></div>
                        </div>
                        <span className="step-title" style={{ color: 'var(--primary)' }}>Payment</span>
                    </div>

                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: 'var(--text-muted)' }}>3</div>
                        </div>
                        <span className="step-title" style={{ color: 'var(--text-muted)' }}>Confirmation</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div>
                        <div className="order-summary-card">
                            <div className="card-header">
                                <ShieldCheck size={24} className="text-primary" />
                                <h3 className="text-xl font-bold">Payment Summary</h3>
                            </div>

                            <div className="summary-details">
                                <div className="summary-item">
                                    <div className="item-label"><span>{order.product_name} (x{order.quantity})</span></div>
                                </div>

                                <div className="summary-item border-t" style={{ paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                                    <div className="item-label"><span style={{ fontSize: '1.25rem', color: 'var(--text-dark)', fontWeight: 'bold' }}>Total Due</span></div>
                                    <div className="item-value" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                        ${parseFloat(order.total_price).toFixed(2)}
                                    </div>
                                </div>

                                <div className="status-badge status-yellow" style={{ textAlign: 'center', marginTop: '1rem', display: 'inline-block', width: '100%' }}>
                                    Pending Payment
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Credit Card</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Enter your payment details below.</p>
                            
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Card Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input type="text" value="•••• •••• •••• 4242" readOnly style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--border)', borderRadius: '8px', background: '#f8fafc', color: 'var(--text-muted)', fontFamily: 'monospace' }} />
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Test mode enabled. Simulated transaction.</p>
                                </div>

                                <button 
                                    onClick={handlePayment} 
                                    disabled={processing}
                                    type="button" 
                                    className="btn-primary-full" 
                                    style={{ marginTop: '1rem', height: '56px' }}
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck size={20} />
                                            Pay ${parseFloat(order.total_price).toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Payment;
