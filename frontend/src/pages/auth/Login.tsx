import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      console.log('Login successful:', response.user);

      // Store user info in localStorage and context
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      // Redirect to account page after successful login
      navigate('/account');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20 20 L50 35 L50 65 L20 80 Z M80 20 L50 35 L50 65 L80 80 Z M50 35 L80 20 M50 65 L80 80" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2 uppercase tracking-wide">
          GYMSHARK LOGIN
        </h1>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-600 mb-8">
          Shop your styles, save top picks to your wishlist,<br />
          track those orders & train with us.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold underline hover:text-gray-600 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'LOGGING IN...' : 'LOG IN'}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold underline hover:text-black transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
