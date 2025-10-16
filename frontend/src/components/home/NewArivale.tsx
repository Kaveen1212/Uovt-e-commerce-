import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample product data - replace with your actual data
const products = [
  {
    id: 1,
    name: 'Vital Shorts',
    description: 'Rich Maroon/Marl',
    price: 'US$42',
    rating: 4.3,
    image: '/01.webp',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 2,
    name: 'Vital V Neck Sports Bra',
    description: 'Light Support',
    subdescription: 'Rich Maroon/Marl',
    price: 'US$38',
    rating: 4.4,
    image: '/02.webp',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'Vital Leggings',
    description: 'Regular',
    subdescription: 'Rich Maroon/Marl',
    price: 'US$55',
    rating: 4.2,
    image: '/03.webp',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 4,
    name: 'Vital Tight TShirt',
    description: 'Black',
    price: 'US$38',
    rating: 4.5,
    image: '/04.webp',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
];

function NewArivale() {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              WOMENS
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              NEW VITAL
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/products')}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 underline transition-colors"
            >
              View All
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-black hover:bg-gray-800 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Product Image Container */}
              <div className="relative bg-gray-200 rounded-sm overflow-hidden mb-4 aspect-[3/4]">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* NEW Badge */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-3 py-1 rounded-sm">
                    NEW
                  </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 text-gray-700" />
                </button>

                {/* Size Selector Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="py-2 text-xs font-semibold text-gray-900 border border-gray-300 hover:bg-black hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 text-sm">
                  {product.name}
                </h3>

                {/* Product Description */}
                <p className="text-xs text-gray-600">
                  {product.description}
                </p>
                {product.subdescription && (
                  <p className="text-xs text-gray-600">
                    {product.subdescription}
                  </p>
                )}

                {/* Price */}
                <p className="font-bold text-gray-900 text-sm pt-1">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArivale;
