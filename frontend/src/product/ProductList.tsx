import { Heart, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services';

function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openFilters, setOpenFilters] = useState<string[]>(['sort']);
  const [sortBy, setSortBy] = useState('relevancy');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
    setSearchQuery(query);
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
              value={searchQuery}
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
                  SORT BY
                  {openFilters.includes('sort') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openFilters.includes('sort') && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-low"
                        checked={sortBy === 'price-low'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Price: Low to High</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-high"
                        checked={sortBy === 'price-high'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Price: High to Low</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="relevancy"
                        checked={sortBy === 'relevancy'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-bold">Relevancy</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="newest"
                        checked={sortBy === 'newest'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Newest</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('category')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide mb-4"
                >
                  CATEGORY
                  {openFilters.includes('category') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openFilters.includes('category') && (
                  <div className="space-y-2">
                    <button
                      onClick={() => filterByCategory('')}
                      className={`block text-sm text-left w-full ${!selectedCategory ? 'font-bold' : ''}`}
                    >
                      All Products
                    </button>
                    {['Shorts', 'Leggings', 'T-Shirts', 'Sports Bras', 'Hoodies'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => filterByCategory(cat)}
                        className={`block text-sm text-left w-full ${selectedCategory === cat ? 'font-bold' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('size')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  SIZE
                  {openFilters.includes('size') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Features */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('features')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  FEATURES
                  {openFilters.includes('features') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Fit */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('fit')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  FIT
                  {openFilters.includes('fit') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Activity */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('activity')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  ACTIVITY
                  {openFilters.includes('activity') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Collection */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('collection')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  COLLECTION
                  {openFilters.includes('collection') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Color */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('color')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  COLOR
                  {openFilters.includes('color') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Price */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('price')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  PRICE
                  {openFilters.includes('price') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No products found</p>
                <button
                  onClick={fetchProducts}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      {/* Product Image */}
                      <div
                        className="relative overflow-hidden mb-3 aspect-[3/4] bg-gray-100"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <img
                          src={product.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* NEW Badge - show for recently created products */}
                        {product.createdAt && new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                          <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1">
                            NEW
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Add to wishlist functionality
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-1">
                        {/* Rating */}
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-black text-black" />
                            <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
                            {product.reviewCount > 0 && (
                              <span className="text-xs text-gray-500">({product.reviewCount})</span>
                            )}
                          </div>
                        )}

                        {/* Product Name */}
                        <h3 className="font-bold text-sm">{product.name}</h3>

                        {/* Description */}
                        <p className="text-xs text-gray-600">{product.description}</p>

                        {/* Category & Brand */}
                        {product.category && (
                          <p className="text-xs text-gray-500">{product.category}</p>
                        )}

                        {/* Price */}
                        <p className="font-bold text-sm">US${product.price}</p>

                        {/* Stock Status */}
                        {product.stock === 0 && (
                          <p className="text-red-600 text-xs">Out of Stock</p>
                        )}
                        {product.stock > 0 && product.stock < 10 && (
                          <p className="text-orange-600 text-xs">Only {product.stock} left!</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Results Count */}
                <div className="mt-8 text-center text-gray-600">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
