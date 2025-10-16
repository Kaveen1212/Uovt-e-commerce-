import { Heart, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample product data
export const products = [
  {
    id: 1,
    name: 'Vital Shorts',
    description: 'Rich Maroon/Marl',
    price: 42,
    rating: 4.3,
    image: '/product1.avif',
    isNew: true,
  },
  {
    id: 2,
    name: 'Vital V Neck Sports Bra',
    description: 'Light Support',
    subdescription: 'Rich Maroon/Marl',
    price: 38,
    rating: 4.4,
    image: '/product2.avif',
    isNew: true,
  },
  {
    id: 3,
    name: 'Vital Leggings',
    description: 'Regular',
    subdescription: 'Rich Maroon/Marl',
    price: 55,
    rating: 4.2,
    image: '/product3.avif',
    isNew: true,
  },
  {
    id: 4,
    name: 'Vital Tight TShirt',
    description: 'Black',
    price: 38,
    rating: 4.5,
    image: '/product4.avif',
    isNew: true,
  },
  {
    id: 5,
    name: 'Vital Shorts',
    description: 'Rich Maroon/Marl',
    price: 42,
    rating: 4.3,
    image: '/product1.avif',
    isNew: false,
  },
  {
    id: 6,
    name: 'Vital Tight TShirt',
    description: 'Rich Maroon/Marl',
    price: 38,
    rating: 4.5,
    image: '/product4.avif',
    isNew: true,
  },
];

function ProductList() {
  const [openFilters, setOpenFilters] = useState<string[]>(['sort']);
  const [sortBy, setSortBy] = useState('relevancy');
  const navigate = useNavigate();

  const toggleFilter = (filterName: string) => {
    setOpenFilters(prev =>
      prev.includes(filterName)
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NEW PRODUCT DROPS
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl">
            Vital's always been the gym girl go-to, and now there's even more ways to wear it.
          </p>
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

              {/* Product Type */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFilter('productType')}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wide"
                >
                  PRODUCT TYPE
                  {openFilters.includes('productType') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Product Image */}
                  <div
                    className="relative overflow-hidden mb-3 aspect-[3/4] bg-gray-100"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* NEW Badge */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1">
                        NEW
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Heart className="w-4 h-4 text-gray-900" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black text-black" />
                      <span className="text-xs font-semibold">{product.rating}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-sm">{product.name}</h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600">{product.description}</p>
                    {product.subdescription && (
                      <p className="text-xs text-gray-600">{product.subdescription}</p>
                    )}

                    {/* Price */}
                    <p className="font-bold text-sm">US${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
