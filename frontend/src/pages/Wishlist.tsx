import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Wishlist() {
  // Empty wishlist state
  const isWishlistEmpty = true;

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {isWishlistEmpty ? (
          // Empty Wishlist View
          <div className="text-center py-20">
            {/* Heart Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-gray-900" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 fill-current" />
              SAVE TO WISHLIST
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Ever wish you could save all your fave fits & accessories in one place to come back to later? Almost like a ✨ wishlist ✨.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/register"
                className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm"
              >
                CREATE ACCOUNT
              </Link>
              <Link
                to="/login"
                className="bg-gray-700 text-white font-bold px-8 py-3 rounded-full hover:bg-gray-600 transition-colors uppercase tracking-wide text-sm"
              >
                LOG IN
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold mb-4">WHY CREATE AN ACCOUNT?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                <div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">SAVE YOUR FAVORITES</h3>
                  <p className="text-sm text-gray-600">
                    Keep all your favorite items in one place and never lose track of what you love
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-sm mb-2">FASTER CHECKOUT</h3>
                  <p className="text-sm text-gray-600">
                    Save your details for a quicker, smoother checkout experience
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-sm mb-2">TRACK YOUR ORDERS</h3>
                  <p className="text-sm text-gray-600">
                    Stay updated with your order status and delivery information
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Wishlist with Items View
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
              <Heart className="w-6 h-6 fill-current" />
              MY WISHLIST
            </h1>
            {/* Add wishlist items grid here when needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
