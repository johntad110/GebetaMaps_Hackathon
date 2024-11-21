import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 mt-16 font-[family-name:var(--font-funnel-display)]">
            <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center">
                {/* Copyright */}
                <div className="text-center text-sm">
                    <p>&copy; 2024 Landcoper. All rights reserved.</p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-6 mt-4">
                    <a href="https://github.com/johntad110/GebetaMaps_Hackathon/" target="_blank" rel="noopener noreferrer">
                        <Github className="text-white hover:text-gray-400 transition duration-300 w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="text-white hover:text-gray-400 transition duration-300 w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="text-white hover:text-gray-400 transition duration-300 w-6 h-6" />
                    </a>
                </div>

                {/* Small screen spacing */}
                <div className="mt-4 text-center text-sm">
                    <p>Designed with ❤️ and John Tad</p>
                </div>
            </div>
        </footer>
    );
}
