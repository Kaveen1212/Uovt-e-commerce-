/**
 * EXAMPLE: ProductList Component - Integrated with Backend
 *
 * This is an example showing how to integrate ProductList with the backend API.
 * Copy the changes you need into your actual ProductList.tsx file.
 *
 * Key Changes:
 * 1. Added useState and useEffect for data fetching
 * 2. Imported productService from services
 * 3. Added loading and error states
 * 4. Replaced hardcoded products with API data
 * 5. Added search and filter functionality
 */

import { Heart, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services';

// Remove the hardcoded products array - we'll fetch from API instead

function ProductList() {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openFilters, setOpenFilters] = useState<string[]>(['sort']);
  const [sortBy, setSortBy] = useState('relevancy');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await productService.searchProducts(query);
      setProducts(data);
    } catch (err: any) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter by category
  const filterByCategory = async (category: string) => {
    setSelectedCategory(category);

    if (!category) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await productService.getProductsByCategory(category);
      setProducts(data);
    } catch (err: any) {
      setError('Filter failed');
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle filter sections
  const toggleFilter = (filterName: string) => {
    setOpenFilters(prev =>
      prev.includes(filterName)
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">No products found</p>
          <button
            onClick={fetchProducts}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NEW PRODUCT DROPS
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl">
            Discover our latest collection of premium workout gear
          </p>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-md w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-4">
              {/* Sort By */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('sort')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide mb-4"
                >
                  Sort By
                  {openFilters.includes('sort') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {openFilters.includes('sort') && (
                  <div className="space-y-2">
                    {['relevancy', 'price-low', 'price-high', 'newest'].map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value={option}
                          checked={sortBy === option}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="capitalize">{option.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('category')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide mb-4"
                >
                  Category
                  {openFilters.includes('category') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {openFilters.includes('category') && (
                  <div className="space-y-2">
                    <button
                      onClick={() => filterByCategory('')}
                      className={`block text-sm text-left ${!selectedCategory ? 'font-bold' : ''}`}
                    >
                      All Products
                    </button>
                    {['Shorts', 'Leggings', 'T-Shirts', 'Sports Bras', 'Hoodies'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => filterByCategory(cat)}
                        className={`block text-sm text-left ${selectedCategory === cat ? 'font-bold' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist logic here
                      }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* New Badge */}
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>

                    {/* Rating */}
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                        {product.reviewCount > 0 && (
                          <span className="text-sm text-gray-500">({product.reviewCount})</span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <p className="font-bold text-lg">${product.price}</p>

                    {/* Stock Status */}
                    {product.stock === 0 && (
                      <p className="text-red-600 text-sm mt-1">Out of Stock</p>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <p className="text-orange-600 text-sm mt-1">Only {product.stock} left!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
