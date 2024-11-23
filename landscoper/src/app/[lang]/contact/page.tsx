'use client'
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-[family-name:var(--font-funnel-display)]">
            <div className="max-w-lg w-full bg-white text-black p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            rows={4}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};
