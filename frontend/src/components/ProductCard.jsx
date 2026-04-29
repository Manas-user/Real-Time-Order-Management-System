import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, onOpenDetails, onPlaceOrder }) => {
    const { name, category, price, available_stock, image_url } = product;
    const [isWishlisted, setIsWishlisted] = useState(false);

    const getStockStatus = () => {
        if (available_stock <= 0) return { label: 'Out of Stock', percent: 0 };
        if (available_stock < 10) return { label: 'Low Stock', percent: 33 };
        return { label: 'In Stock', percent: 100 };
    };

    const status = getStockStatus();
    const discount = Math.floor(Math.random() * 21) + 5; // Random 5-25% discount for demo
    const originalPrice = (parseFloat(price) / (1 - discount / 100)).toFixed(2);
    const rating = (Math.random() * 2 + 3.5).toFixed(1); // Random rating 3.5-5.5
    const reviews = Math.floor(Math.random() * 500) + 50; // Random reviews 50-550

    return (
        <div className="shopee-product-card">
            {/* Image Container */}
            <div className="shopee-image-container">
                {image_url ? (
                    <img src={image_url} alt={name} className="shopee-product-image" />
                ) : (
                    <div className="shopee-image-fallback">
                        <ShoppingCart size={48} />
                    </div>
                )}
                
                {/* Wishlist Button */}
                <button
                    className={`shopee-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="shopee-discount-badge">
                        -{discount}%
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="shopee-product-info">
                <h3 className="shopee-product-name" title={name}>{name}</h3>
                
                {/* Price Section */}
                <div className="shopee-price-section">
                    <div className="shopee-price-row">
                        <span className="shopee-price">${parseFloat(price).toFixed(2)}</span>
                        {discount > 0 && (
                            <span className="shopee-original-price">${originalPrice}</span>
                        )}
                    </div>
                </div>

                {/* Rating & Reviews */}
                <div className="shopee-rating-section">
                    <div className="shopee-stars">
                        {'★'.repeat(Math.floor(rating))}
                        <span className="shopee-rating-text">{rating}</span>
                    </div>
                    <span className="shopee-reviews-count">({reviews})</span>
                </div>

                {/* Stock Status */}
                <div className="shopee-stock-bar">
                    <div className="shopee-stock-fill" style={{ width: `${status.percent}%` }}></div>
                </div>
                <span className="shopee-stock-text">{status.label}</span>

                {/* Action Button */}
                <button
                    className="shopee-add-to-cart-btn"
                    onClick={() => onPlaceOrder(product)}
                    disabled={available_stock <= 0}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
