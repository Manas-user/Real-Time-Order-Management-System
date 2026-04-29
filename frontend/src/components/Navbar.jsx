import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Home, ShoppingCart, FileText, Package, ListOrdered } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Handle body overflow when sidebar opens
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [sidebarOpen]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Products', path: '/products', icon: ShoppingCart },
        { name: 'Place Order', path: '/place-order', icon: FileText },
        { name: 'Order Status', path: '/order-status', icon: Package },
        { name: 'Orders', path: '/orders', icon: ListOrdered },
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar-wrapper">
                    {/* Logo */}
                    <Link to="/" className="nav-logo">
                        <ShoppingBag size={28} style={{ color: 'var(--primary)' }} />
                        <span className="logo-text">
                            OrderFlow <span className="logo-accent">Pro</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="nav-links-desktop">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
                        <ShoppingBag size={24} style={{ color: 'var(--primary)' }} />
                        <span>OrderFlow Pro</span>
                    </Link>
                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <p className="sidebar-version">OrderFlow Pro v1.0</p>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
