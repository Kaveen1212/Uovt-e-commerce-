import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20 20 L50 35 L50 65 L20 80 Z M80 20 L50 35 L50 65 L80 80 Z M50 35 L80 20 M50 65 L80 80" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2 uppercase tracking-wide">
          CREATE ACCOUNT
        </h1>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-600 mb-8">
          Join the Gymshark family and unlock exclusive benefits
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name*"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name*"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleChange}
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

          {/* Date of Birth */}
          <div>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of birth*"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-white"
            >
              <option value="">Select gender*</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-black"
              />
              <span className="text-xs text-gray-600">
                I agree to the{' '}
                <a href="#" className="underline hover:text-black">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="underline hover:text-black">
                  Privacy Policy
                </a>
                *
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToMarketing"
                checked={formData.agreeToMarketing}
                onChange={handleChange}
                className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-black"
              />
              <span className="text-xs text-gray-600">
                I want to receive marketing communications and exclusive offers from Gymshark
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm mt-6"
          >
            CREATE ACCOUNT
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold underline hover:text-black transition-colors"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
