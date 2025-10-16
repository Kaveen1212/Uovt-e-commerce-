import { X, Heart, Plus, Minus, Lock } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  isNew?: boolean;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

function Cart({ isOpen, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Vital Leggings',
      description: 'Rich Maroon/Marl - XS-Regular',
      price: 55,
      image: '/03.webp',
      quantity: 1,
      isNew: true,
    },
    {
      id: 2,
      name: 'Power Washed Tank',
      description: 'GS Black - M- Oversized Fit',
      price: 35,
      image: '/04.webp',
      quantity: 1,
      isNew: true,
    },
  ]);

  const [discountCode, setDiscountCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // const removeItem = (id: number) => {
  //   setCartItems(items => items.filter(item => item.id !== id));
  // };

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-80 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold uppercase tracking-wide">YOUR BAG</h2>
          </div>
          <button className="text-gray-700 hover:text-black transition-colors">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Delivery Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <button className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Delivery & Shipping Information</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items Not Reserved Warning */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Your items aren't reserved</span>, checkout quickly to make sure you don't miss out.
            </p>
          </div>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-32 bg-gray-200 rounded flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                  {item.isNew && (
                    <span className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                  <button className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <Heart className="w-3 h-3" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="font-bold text-sm mb-3">US${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Items Section */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-bold text-sm mb-4 uppercase">ADD A LITTLE EXTRA</h3>
            <p className="text-xs text-gray-600 mb-4">
              Add one or more of these items to get free delivery
            </p>
            <div className="flex gap-4 overflow-x-auto">
              <div className="flex-shrink-0 w-32">
                <img src="/01.webp" alt="Extra item" className="w-full h-32 object-cover rounded mb-2" />
                <p className="text-xs font-semibold mb-1">Graphic Lever Lifting Belt</p>
                <p className="text-xs font-bold mb-2">US$190</p>
                <button className="text-xs font-bold underline hover:text-gray-600">+ ADD</button>
              </div>
              <div className="flex-shrink-0 w-32">
                <img src="/02.webp" alt="Extra item" className="w-full h-32 object-cover rounded mb-2" />
                <p className="text-xs font-semibold mb-1">Power Hooks</p>
                <p className="text-xs font-bold mb-2">US$60</p>
                <button className="text-xs font-bold underline hover:text-gray-600">+ ADD</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Discount & Checkout */}
        <div className="border-t p-6 space-y-4">
          {/* Discount Code */}
          <div>
            <h3 className="font-bold text-sm mb-3 uppercase">DISCOUNT CODE</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors uppercase">
                Apply
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wide flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            CHECKOUT SECURELY
          </button>

          {/* Payment Methods */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
            <div className="bg-red-600 text-white px-2 py-1 rounded-full flex items-center justify-center w-10 h-6">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-70"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">AMEX</div>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">PayPal</div>
            <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold"> Pay</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
