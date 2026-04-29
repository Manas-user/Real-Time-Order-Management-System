import React from 'react';
import { Package, Tag, Calculator, ShoppingBag } from 'lucide-react';

const OrderSummaryCard = ({ product }) => {
    if (!product) return null;

    return (
        <div className="order-summary-card">
            <div className="card-header">
                <ShoppingBag size={24} className="text-primary" />
                <h3 className="text-xl font-bold">Order Summary</h3>
            </div>

            <div className="summary-details">
                <div className="summary-item">
                    <div className="item-label">
                        <Package size={18} />
                        <span>Product</span>
                    </div>
                    <div className="item-value font-semibold">{product.name}</div>
                </div>

                <div className="summary-item">
                    <div className="item-label">
                        <Tag size={18} />
                        <span>Category</span>
                    </div>
                    <div className="item-value">{product.category}</div>
                </div>

                <div className="summary-item">
                    <div className="item-label">
                        <Calculator size={18} />
                        <span>Unit Price</span>
                    </div>
                    <div className="item-value font-bold text-primary">
                        ${parseFloat(product.price).toFixed(2)}
                    </div>
                </div>

                <div className="summary-item border-t" style={{ paddingTop: '1rem', marginTop: '1rem' }}>
                    <div className="item-label">
                        <span>Stock Availability</span>
                    </div>
                    <div className="item-value font-medium" style={{ color: product.available_stock < 10 ? '#854d0e' : '#166534' }}>
                        {product.available_stock} units left
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryCard;
