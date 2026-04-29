import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';

const ProductList = ({ products, onAddToOrder }) => {
    return (
        <div className="product-list">
            <h2 className="section-title mb-6">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="product-image-placeholder glass-card mb-4 aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-pink-500/10">
                                <ShoppingCart size={48} className="text-white/20" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-text-muted text-sm mb-4">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            <button
                                onClick={() => onAddToOrder(product)}
                                className="btn btn-primary"
                            >
                                <Plus size={20} />
                                Order Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .grid {
          display: grid;
        }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 768px) { .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .gap-6 { gap: 1.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .p-6 { padding: 1.5rem; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .section-title { font-size: 2rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-sm { font-size: 0.875rem; }
      `}</style>
        </div>
    );
};

export default ProductList;
