import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Products from './pages/Products';
import PlaceOrder from './pages/PlaceOrder';
import Payment from './pages/Payment';
import OrderStatus from './pages/OrderStatus';
import Navbar from './components/Navbar';
import { ShoppingBag } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/order-status/:orderId" element={<OrderStatus />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <Link to="/" className="footer-logo">
                  <ShoppingBag size={24} className="text-primary" />
                  <span>OrderFlow <span className="text-primary">System</span></span>
                </Link>
                <p className="footer-about">
                  A high-performance real-time order processing platform built with a distributed architecture for maximum reliability and scale.
                </p>
              </div>

              <div>
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/" className="footer-link">Home</Link></li>
                  <li><Link to="/products" className="footer-link">Products</Link></li>
                  <li><Link to="/order-status" className="footer-link">Track Order</Link></li>
                  <li><Link to="/orders" className="footer-link">Order History</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">Support</h4>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Documentation</a></li>
                  <li><a href="#" className="footer-link">API Reference</a></li>
                  <li><a href="#" className="footer-link">System Health</a></li>
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="copyright">
                © {new Date().getFullYear()} OrderFlow System. Academic Distributed Database Project.
              </p>
              <div className="footer-legal">
                <a href="#" className="legal-link">Terms</a>
                <a href="#" className="legal-link">Privacy</a>
                <a href="#" className="legal-link">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
