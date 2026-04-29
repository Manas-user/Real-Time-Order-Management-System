import React, { useState } from 'react';
import { X, ShoppingCart, Info, Package } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, onConfirmOrder }) => {
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="modal-category">{product.category}</div>
                    <h2 className="modal-title">{product.name}</h2>
                </div>

                <div className="modal-body">
                    <div className="modal-grid">
                        <div className="modal-info-col">
                            <div className="info-item">
                                <Info size={18} />
                                <div>
                                    <label>Description</label>
                                    <p>Experience the best-in-class performance and quality with our premium {product.name}. Perfect for your daily needs.</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Package size={18} />
                                <div>
                                    <label>Availability</label>
                                    <p>{product.available_stock} units available in stock</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-order-col">
                            <div className="price-tag">
                                <span className="label">Unit Price</span>
                                <span className="value">${parseFloat(product.price).toFixed(2)}</span>
                            </div>

                            <div className="quantity-selector">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.available_stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                />
                            </div>

                            <div className="total-preview">
                                <span className="label">Total Amount</span>
                                <span className="value">${totalPrice}</span>
                            </div>

                            <button
                                className="btn-primary-full"
                                onClick={() => onConfirmOrder(product, quantity)}
                                disabled={product.available_stock <= 0}
                            >
                                <ShoppingCart size={20} />
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
