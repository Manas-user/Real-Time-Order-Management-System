import React from 'react';
import { Search, Filter } from 'lucide-react';

const ProductFilter = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    inStockOnly,
    setInStockOnly
}) => {
    const categories = ['All', 'Electronics', 'Grocery', 'Office Supplies', 'Accessories'];

    return (
        <div className="product-filters">
            <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <div className="select-wrapper">
                    <Filter size={16} className="filter-icon" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <label className="toggle-wrapper">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="toggle-input"
                    />
                    <span className="toggle-label">In Stock Only</span>
                </label>
            </div>
        </div>
    );
};

export default ProductFilter;
