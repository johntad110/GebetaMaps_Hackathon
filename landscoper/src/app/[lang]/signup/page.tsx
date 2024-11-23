'use client'
import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signing up with:', { email, password, accountType });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="max-w-sm w-full bg-black p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent border-b-2 border-white text-white py-2 px-3 focus:outline-none focus:border-gray-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent border-b-2 border-white text-white py-2 px-3 focus:outline-none focus:border-gray-400"
              required
            />
          </div>

          {/* Account Type Field */}
          <div>
            <label htmlFor="accountType" className="block text-sm font-semibold mb-2">
              Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-xl border-b-2 border-white text-white py-2 px-3 focus:outline-none focus:border-gray-400"
              required
            >
              <option value="" disabled>
                Select Account Type
              </option>
              <option value="landlord">Landlord</option>
              <option value="realtor">Realtor</option>
              <option value="client">Client</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white border-2 border-white py-2 px-4 font-semibold hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-white underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
