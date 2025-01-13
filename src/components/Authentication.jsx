import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reflexion-journal-app-backend.onrender.com/api/auth/login', formData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reflexion-journal-app-backend.onrender.com/api/auth/signup', formData);
      if (response.data.success) {
        setSuccessMessage('Account created successfully!');
        setIsLogin(true);
        setFormData({ username: '', password: '' });
      } else {
        setErrorMessage(response.data.message || 'Sign-up failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#d5fe02] to-[#000000] px-4 sm:px-6 lg:px-8 text-[#f6f6f6]">
      <div className="w-full max-w-md p-8 bg-[#111111] rounded-lg shadow-lg">
        {successMessage && (
          <div className="mb-4 text-center text-green-400 font-medium">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-center text-red-400 font-medium">
            {errorMessage}
          </div>
        )}
        {isLogin ? (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-[#d5fe02]">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#d5fe02]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d5fe02] bg-[#f6f6f6] text-[#111111] rounded-lg focus:ring-[#d5fe02] focus:border-[#d5fe02]"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#d5fe02]"
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d5fe02] bg-[#f6f6f6] text-[#111111] rounded-lg focus:ring-[#d5fe02] focus:border-[#d5fe02]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-[#d5fe02] hover:text-[#9118dc]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#d5fe02] text-[#111111] py-2 rounded-lg hover:bg-[#6911a7] transition"
              >
                Log In
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#6911a7] hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-[#d5fe02]">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label
                  htmlFor="signup-username"
                  className="block text-sm font-medium text-[#d5fe02]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d5fe02] bg-[#f6f6f6] text-[#111111] rounded-lg focus:ring-[#d5fe02] focus:border-[#d5fe02]"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-[#d5fe02]"
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d5fe02] bg-[#f6f6f6] text-[#111111] rounded-lg focus:ring-[#d5fe02] focus:border-[#d5fe02]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-[#d5fe02] hover:text-[#9118dc]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#d5fe02] text-[#111111] py-2 rounded-lg hover:bg-[#6911a7] transition"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#6911a7] hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
