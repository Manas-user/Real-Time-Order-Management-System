import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import ProductModal from '../components/ProductModal';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productService.getProducts();

            // Handle axios response
            const data = response.data;

            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error("Unexpected data format:", data);
                setProducts([]);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
            // If the error message from backend is available, show it
            const msg = err.response?.data?.message || err.message || "Connection failure";
            setError(`Could not load products: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmOrder = (product, quantity) => {
        // Option: Navigate to place-order with state
        navigate('/place-order', { state: { product, quantity } });
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesStock = !inStockOnly || p.available_stock > 0;
        return matchesSearch && matchesCategory && matchesStock;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 if filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, inStockOnly]);

    return (
        <div className="products-page">
            {/* Promotional Banner */}
            <div className="products-banner">
                <div className="container">
                    <div className="banner-content">
                        <div className="banner-text">
                            <h2>Discover Our Collection</h2>
                            <p>Explore thousands of products at amazing prices</p>
                        </div>
                        <div className="banner-cta">
                            <button className="btn-banner-cta">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container products-main">
                {/* Filters Section */}
                <ProductFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                />

                {/* Loading State */}
                {loading ? (
                    <div className="products-loading">
                        <Loader2 className="animate-spin" size={48} style={{color: 'var(--primary)'}} />
                        <p>Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="products-error">
                        <h3>Connection Error</h3>
                        <p>{error}</p>
                        <button className="btn-primary-small" onClick={fetchProducts} style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1rem' }}>
                            Try Again
                        </button>
                    </div>
                ) : paginatedProducts.length > 0 ? (
                    <>
                        {/* Product Grid */}
                        <div className="product-grid">
                            {paginatedProducts.map(product => (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                    onOpenDetails={handleOpenDetails}
                                    onPlaceOrder={(p) => handleConfirmOrder(p, 1)}
                                />
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="products-pagination">
                                <button 
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <div className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <button 
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="products-empty">
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                        <button className="btn-primary-small" onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('All');
                            setInStockOnly(false);
                            setCurrentPage(1);
                        }}>Reset Filters</button>
                    </div>
                )}
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirmOrder={handleConfirmOrder}
            />
        </div>
    );
};

export default Products;
