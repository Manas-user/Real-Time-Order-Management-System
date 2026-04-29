import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock, Truck, AlertCircle } from 'lucide-react';
import OrderSummaryCard from '../components/OrderSummaryCard';
import OrderForm from '../components/OrderForm';

const PlaceOrder = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);

    if (!product) {
        return <Navigate to="/products" replace />;
    }

    return (
        <div className="place-order-page">
            <header className="place-order-header">
                <div className="container">
                    <Link to="/products" className="back-button">
                        <ArrowLeft size={20} />
                        Back to Products
                    </Link>
                    <div style={{ marginTop: '1.5rem' }}>
                        <h1 className="place-order-title">Confirm Your Order</h1>
                        <p className="place-order-subtitle">
                            Verify your product details and place your order securely.
                        </p>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '3rem 1.5rem' }}>
                <div className="steps-container" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: '#22c55e' }}>
                                <Check size={20} />
                            </div>
                            <div className="step-line"></div>
                        </div>
                        <span className="step-title">Review</span>
                    </div>
                    
                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: 'var(--text-muted)' }}>2</div>
                            <div className="step-line"></div>
                        </div>
                        <span className="step-title" style={{ color: 'var(--text-muted)' }}>Payment</span>
                    </div>

                    <div className="step-item">
                        <div className="step-wrapper">
                            <div className="step-number-wrapper" style={{ background: 'var(--text-muted)' }}>3</div>
                        </div>
                        <span className="step-title" style={{ color: 'var(--text-muted)' }}>Confirmation</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Left: Summary */}
                    <div>
                        <OrderSummaryCard product={product} />

                        {/* Trust elements matching index.css feature style */}
                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)' }}>
                                <div style={{ color: 'var(--primary)' }}><Lock size={20} /></div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Secure Checkout</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>256-bit SSL encrypted</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)' }}>
                                <div style={{ color: '#22c55e' }}><Check size={20} /></div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Guaranteed Stock</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reserved instantly upon order</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div>
                        <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Billing Details</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure your order to proceed to payment.</p>
                            
                            <OrderForm product={product} setIsProcessing={setIsProcessing} />
                        </div>
                        
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            By placing your order, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaceOrder;
