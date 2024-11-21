export default function Header() {
    return (
        <header className="w-full fixed top-0 z-50 font-[family-name:var(--font-funnel-display)]">
            <div className="flex justify-between items-center w-[95%] p-4 my-4 bg-white/20 backdrop-blur-lg rounded-full shadow-lg max-w-screen-xl mx-auto">

                <a href="/">
                    <div className="text-white text-xl font-semibold">
                        <img
                            src="/landscoper-logo-v1.svg"
                            alt="Landscoper Logo"
                            className="h-8"
                        />
                    </div>
                </a>
                {/* Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <a href="#" className="text-white hover:text-black transition duration-300">Home</a>
                    <a href="#about" className="text-white hover:text-black transition duration-300">About</a>
                    <a href="#services" className="text-white hover:text-black transition duration-300">Services</a>
                    <a href="#contact" className="text-white hover:text-black transition duration-300">Contact</a>
                </nav>
                {/* Mobile Menu (Hamburger Icon) */}
                <div className="md:hidden bg-white/25 rounded-md my-auto">
                    <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
