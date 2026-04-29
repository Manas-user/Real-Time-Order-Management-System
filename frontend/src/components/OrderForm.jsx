import React, { useState } from 'react';
import { ShoppingCart, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { orderService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ product, setIsProcessing }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const price = product ? parseFloat(product.price) : 0;
    const totalPrice = (quantity * price).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;

        try {
            setLoading(true);
            if (setIsProcessing) setIsProcessing(true);
            setError(null);

            // Using dummy user_id as per project context (usually would come from auth)
            const orderData = {
                user_id: 1,
                product_id: product.product_id,
                quantity: quantity
            };

            const response = await orderService.createOrder(orderData);

            // Assuming backend returns { success: true, order_id: ... } or similar
            const result = response.data;
            setSuccess(result.order_id || 'SUCCESS');
        } catch (err) {
            console.error("Order creation failed:", err);
            const msg = err.response?.data?.message || "Failed to place order. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
            if (setIsProcessing) setIsProcessing(false);
        }
    };

    if (success) {
        return (
            <div className="success-state" style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                <CheckCircle size={64} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Order placed successfully!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your order ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--text-dark)' }}>{success}</span></p>

                <button
                    onClick={() => navigate(`/payment/${success}`)}
                    className="btn-primary-full"
                >
                    Proceed to Payment
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="order-form" style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Configuration</h3>

            {error && (
                <div className="error-alert" style={{ marginBottom: '1.5rem' }}>
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="quantity-selector">
                <label>Quantity</label>
                <input
                    type="number"
                    min="1"
                    max={product?.available_stock || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    required
                />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Max available: {product?.available_stock || 0}
                </p>
            </div>

            <div className="total-preview">
                <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Estimated Total</span>
                </div>
                <span className="value">
                    ${totalPrice}
                </span>
            </div>

            <button
                type="submit"
                disabled={loading || !product || product.available_stock <= 0}
                className="btn-primary-full"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                    </>
                ) : (
                    <>
                        <ShoppingCart size={20} />
                        Confirm Order
                    </>
                )}
            </button>

            {!loading && product?.available_stock <= 0 && (
                <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '0.875rem', marginTop: '1rem', fontWeight: 500 }}>
                    This item is currently out of stock.
                </p>
            )}
        </form>
    );
};

export default OrderForm;
