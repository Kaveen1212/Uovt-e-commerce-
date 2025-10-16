import { Heart, Share2, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
  };
  onClose: () => void;
}

const colorVariants = [
  { id: 1, name: 'Rich Maroon/Marl', image: '/product1.avif' },
  { id: 2, name: 'Black', image: '/product4.avif' },
  { id: 3, name: 'Taupe', image: '/product3.avif' },
  { id: 4, name: 'Pink Sand', image: '/product2.avif' },
  { id: 5, name: 'Navy', image: '/product1.avif' },
  { id: 6, name: 'Olive', image: '/product4.avif' },
  { id: 7, name: 'Purple', image: '/product3.avif' },
  { id: 8, name: 'Coral', image: '/product2.avif' },
  { id: 9, name: 'Sour Pink/Marl', image: '/product1.avif' },
];

const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(8);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const images = [product.image, product.image, product.image]; // In real app, would have multiple images



  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      description: `${colorVariants[selectedColor].name} - ${selectedSize}`,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: colorVariants[selectedColor].name,
      isNew: true,
    });

    setTimeout(() => {
      setIsAdding(false);
      // Open cart sidebar
      openCart();
    }, 500);
  };

  return (
    <div className="bg-transparent">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-[1fr_620px] gap-30">
          {/* Left Side - Image Gallery */}
          <div className="relative bg-transparent">

            {/* Main Image - Full Height */}
            <div className="h-[60vh] flex flex-col mt-10">
              <div className="flex flex-1">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-1/2 h-full object-cover"
                />

                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-1/2 h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 py-4 bg-white border-t border-gray-200">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details (Fixed/Sticky) */}
          <div className="bg-white lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
            <div className="px-10 pt-12 pb-10">
              {/* Title & Price */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-wide leading-none mb-3">
                  VITAL SHORTS
                </h1>
                <p className="text-base font-normal">US${product.price}</p>
              </div>

              {/* Rating & Actions */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold">★ {product.rating}</span>
                  <span className="text-sm text-gray-600">(1119)</span>
                </div>
                <button className="ml-auto w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Heart className="w-[18px] h-[18px]" />
                </button>
                <button className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* DO IT IN VITAL Section */}
              <div className="bg-gray-100 px-5 py-5 rounded mb-10">
                <h3 className="text-[13px] font-bold mb-2 leading-tight">DO IT IN VITAL ✨</h3>
                <p className="text-[12px] text-gray-800 leading-[1.65]">
                  From gym, to outdoor workouts, to rest days, there's a Vital fit just for it.
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-10">
                <div className="grid grid-cols-6 gap-2.5 mb-4">
                  {colorVariants.map((color, index) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(index)}
                      className={`aspect-square rounded-sm border-[3px] overflow-hidden transition-all ${
                        selectedColor === index
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-900 text-center font-normal">
                  {colorVariants[selectedColor].name}
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[13px] font-semibold">Select a size</p>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold underline hover:no-underline">
                    <span>📏</span> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-[11px] font-bold border rounded transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-green-700 flex items-center gap-1.5">
                  <span className="text-green-700">✓</span> Customers say it fits{' '}
                  <span className="font-bold underline cursor-pointer">
                    true to size
                  </span>
                </p>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 bg-black text-white text-[13px] font-bold tracking-[0.05em] rounded-full hover:bg-gray-800 transition-colors uppercase mb-10 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isAdding ? 'ADDING...' : 'ADD TO BAG'}
              </button>

              {/* Unlock Access Section */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-[11px] font-bold mb-0 underline cursor-pointer">
                  Unlock Access to Exclusive Rewards & Benefits
                </h3>
              </div>

              {/* Description Section */}
              <div className="border-t border-gray-200">
                <button
                  onClick={() => setOpenSection('description')}
                  className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
                >
                  <span className="text-[13px] font-bold uppercase tracking-wide">DESCRIPTION</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Delivery & Returns Section */}
              <div className="border-t border-gray-200">
                <button
                  onClick={() => setOpenSection('delivery')}
                  className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
                >
                  <span className="text-[13px] font-bold uppercase tracking-wide">DELIVERY & RETURNS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {openSection === 'description' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-wide">DESCRIPTION</h2>
              <button
                onClick={() => setOpenSection(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 py-8 space-y-8">
              {/* Main Description */}
              <div>
                <h3 className="text-lg font-bold mb-3">VITAL. EVERY TIME.</h3>
                <p className="text-sm leading-relaxed mb-4">
                  HIIT staples, pilates must-haves, lifting fits, running essentials...Vital's the
                  gym girl go-to every time.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• The most versatile gym fits you'll own</li>
                  <li>• Contouring mesh dots shape your physique</li>
                  <li>• Durable, seamless fabric that sculpts</li>
                  <li>• Breathable & sweat-wicking to keep you cool</li>
                  <li>• Waist-snatching waistband that actually stays in place</li>
                </ul>
              </div>

              {/* Size & Fit */}
              <div>
                <h3 className="text-lg font-bold mb-3">SIZE & FIT</h3>
                <ul className="space-y-2 text-sm">
                  <li>• High-waisted</li>
                  <li>• Body fit</li>
                  <li>• 5" inseam based on size M</li>
                  <li>• Model is 5'10" and wears size S</li>
                </ul>
              </div>

              {/* Materials & Care */}
              <div>
                <h3 className="text-lg font-bold mb-3">MATERIALS & CARE</h3>
                <p className="text-sm">93% Nylon, 7% Elastane</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery & Returns Modal */}
      {openSection === 'delivery' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-wide">DELIVERY & RETURNS</h2>
              <button
                onClick={() => setOpenSection(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 py-8 space-y-6">
              {/* Delivery */}
              <div>
                <h3 className="text-lg font-bold mb-3">DELIVERY</h3>
                <div className="space-y-2 text-sm">
                  <p>Standard delivery: 4-7 business days - $4.99</p>
                  <p>Express delivery: 2-3 business days - $9.99</p>
                  <p className="font-semibold">Free standard delivery on orders over $75</p>
                </div>
              </div>

              {/* Returns */}
              <div>
                <h3 className="text-lg font-bold mb-3">RETURNS</h3>
                <p className="text-sm leading-relaxed mb-4">
                  We offer free returns within 45 days of purchase. Items must be unworn,
                  unwashed and in original condition with all tags attached.
                </p>
                <a href="#" className="text-sm underline hover:no-underline">
                  View full return policy
                </a>
              </div>

              {/* Exchange */}
              <div>
                <h3 className="text-lg font-bold mb-3">EXCHANGES</h3>
                <p className="text-sm leading-relaxed">
                  Need a different size or color? We make exchanges easy. Simply return your
                  original item and place a new order.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
