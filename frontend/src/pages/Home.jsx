'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Laptop,
    ShoppingCart,
    Briefcase,
    Component,
    ArrowRight,
    Search,
    CreditCard,
    Box,
    BarChart3,
    ChevronRight,
    Zap,
    Clock,
    Shield
} from 'lucide-react';

// Import hero images
import trackingImg from '../assets/images/hero_tracking.png';
import productsImg from '../assets/images/hero_products.png';
import paymentImg from '../assets/images/hero_payment.png';

const CategoryCard = ({ icon: Icon, title, link, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={link}
            className="category-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="card-inner">
                <div className="home-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(26, 127, 126, 0.1), rgba(32, 178, 170, 0.1))' }}>
                    <Icon size={36} style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">Explore {title.toLowerCase()}</p>
                <div className="card-link" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                    View Products
                    <ChevronRight size={18} />
                </div>
            </div>
        </Link>
    );
};

const StepIndicator = ({ number, title, icon: Icon, isLast }) => (
    <div className="step-item">
        <div className="step-wrapper">
            <div className="step-number-wrapper">
                <span className="step-number">{number}</span>
            </div>
            <div className="step-line" style={{ display: isLast ? 'none' : 'block' }}></div>
        </div>
        <h4 className="step-title">{title}</h4>
        <Icon size={24} className="step-icon" />
    </div>
);

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="feature-item">
        <div className="feature-icon">
            <Icon size={28} />
        </div>
        <h4 className="feature-title">{title}</h4>
        <p className="feature-desc">{description}</p>
    </div>
);

const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { icon: Laptop, title: 'Electronics', link: '/products?category=electronics' },
        { icon: ShoppingCart, title: 'Grocery', link: '/products?category=grocery' },
        { icon: Briefcase, title: 'Office Supplies', link: '/products?category=office' },
        { icon: Component, title: 'Accessories', link: '/products?category=accessories' },
    ];

    const features = [
        { icon: Zap, title: 'Lightning Fast', description: 'Process orders in milliseconds with our optimized system' },
        { icon: Clock, title: 'Real-Time Tracking', description: 'Track your orders live as they move through our pipeline' },
        { icon: Shield, title: 'Secure Payments', description: 'Enterprise-grade security for all transactions' },
    ];

    return (
        <div className="home-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background"></div>
                <div className="container hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">✨ Next-Gen E-Commerce</span>
                        <h1 className="hero-title">
                            Order Processing
                            <span className="gradient-text"> Reimagined</span>
                        </h1>
                        <p className="hero-subtitle">
                            Process orders instantly with real-time inventory management, live tracking, and seamless payment processing. Built for scale.
                        </p>
                        <div className="hero-cta">
                            <Link to="/" className="btn-primary-large">
                                Start Browsing
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/orders" className="btn-secondary-large">
                                Track Orders
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
                        <div className="floating-card card-1" style={{ backgroundImage: `url(${trackingImg})` }}></div>
                        <div className="floating-card card-2" style={{ backgroundImage: `url(${productsImg})` }}></div>
                        <div className="floating-card card-3" style={{ backgroundImage: `url(${paymentImg})` }}></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Us</h2>
                        <p className="section-subtitle">Powerful features designed for your success</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, idx) => (
                            <FeatureItem key={idx} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Browse our curated collections</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((cat, idx) => (
                            <CategoryCard key={idx} {...cat} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Order Processing Flow Section */}
            <section className="process-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Four simple steps to your order</p>
                    </div>
                    <div className="steps-container">
                        <StepIndicator number="1" title="Browse Products" icon={Search} />
                        <StepIndicator number="2" title="Place Order" icon={Box} />
                        <StepIndicator number="3" title="Payment Processing" icon={CreditCard} />
                        <StepIndicator number="4" title="Track & Receive" icon={BarChart3} isLast />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-subtitle">Join thousands of satisfied customers managing their orders efficiently</p>
                    <Link to="/" className="btn-primary-large">
                        Start Shopping Now
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
