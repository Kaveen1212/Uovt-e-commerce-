import { Search, Heart, User, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, isCartOpen, openCart, closeCart } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - Left */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Women
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Men
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Accessories
            </a>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-wider text-gray-900">
              UoVT
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar - Desktop Only */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="What are you looking for today..."
                className="w-80 px-4 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Icons */}
            <Link to="/wishlist" className="hidden md:block text-gray-700 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={openCart}
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for today..."
                className="w-full px-4 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3 pt-2">
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-2">
                Women
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-2">
                Men
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-2">
                Accessories
              </a>
              <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </nav>
  );
}

export default Navbar;
