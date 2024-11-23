'use client'
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', { email, password });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
            <div className="max-w-sm w-full bg-black p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

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

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white border-2 border-white py-2 px-4 font-semibold hover:bg-white hover:text-black transition"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-400 mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-white underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
