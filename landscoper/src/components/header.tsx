'use client'

import { LucideXCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from 'react-country-flag';

export default function Header({ dict }: { dict: any }) {
    const [currentLang, setCurrentLang] = useState('am');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [currentPath, setcurrentPath] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const langRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'am', name: 'Amharic', countryCode: 'ET' },
        { code: 'en', name: 'English', countryCode: 'GR' },
    ]

    useEffect(() => {
        const pathname = window.location.pathname;
        setcurrentPath(pathname);
        const langFromPath = pathname.split('/')[1];
        if (languages.some(l => l.code === langFromPath)) {
            setCurrentLang(langFromPath);
        }
    }, [])

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]; // Default to English
    return (
        <header className="w-full fixed top-0 z-50 font-[family-name:var(--font-funnel-display)]">
            <div className="flex justify-between items-center w-[95%] p-4 my-4 bg-white/20 backdrop-blur-lg rounded-full shadow-lg max-w-screen-xl mx-auto">

                <a href="/">
                    <div className="text-white text-xl font-semibold">
                        <img
                            src="/images/landscoper-logo-v1.svg"
                            alt="Landscoper Logo"
                            className="h-8"
                        />
                    </div>
                </a>

                <div className="flex gap-4">
                    {/* Language Dropdown */}
                    <div
                        className="hover:cursor-pointer hover:border-gray-400 border border-amber-600 border-b-4 px-1 rounded-md"
                        onMouseEnter={() => setShowLangDropdown(true)}
                        onMouseLeave={() => setShowLangDropdown(false)}
                        ref={langRef}
                    >
                        {getCountryFlag(currentLanguage.countryCode)} <span className="text-xs">{currentLanguage.code.toLocaleUpperCase()}</span>
                        {showLangDropdown && (
                            <div
                                className="absolute z-50 bg-gradient-to-bl from-amber-700 via-blue-950 to-black text-white shadow-lg rounded-xl mt-0 overflow-hidden border border-gray-500 border-b-4"
                            >
                                {languages.map((lang) => (
                                    <Link
                                        key={lang.code}
                                        href={`/${lang.code}${currentPath.slice(3)}/`}
                                        onClick={() => setShowLangDropdown(false)}
                                    >
                                        <div className="flex items-center p2 hover:bg-amber-900 cursor-pointer p-2">
                                            {getCountryFlag(lang.countryCode)} <p className="px-2">{lang.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="text-white hover:text-amber-300 transition duration-300">{dict["header"]["home"]}</a>
                        <a href="/about" className="text-white hover:text-amber-300 transition duration-300">{dict["header"]["about"]}</a>
                        <a href="/services" className="text-white hover:text-amber-300 transition duration-300">{dict["header"]["services"]}</a>
                        <a href="/contact" className="text-white hover:text-amber-300 transition duration-300">{dict["header"]["contact"]}</a>
                    </nav>
                    {/* Mobile Menu Button (Hamburger Icon) */}
                    <div className="md:hidden">
                        <button
                            className={`text-white focus:outline-none transition-all duration-300 ${isMenuOpen ? 'open' : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="relative w-6 h-6">
                                <span className={`block w-6 h-1 bg-white rounded transition-all duration-300 absolute ${isMenuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                                <span className={`block w-6 h-1 bg-white rounded transition-all duration-300 absolute ${isMenuOpen ? 'opacity-0' : 'top-2'}`}></span>
                                <span className={`block w-6 h-1 bg-white rounded transition-all duration-300 absolute ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <nav className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg z-40">
                    <div className="flex justify-end p-6">
                        <button onClick={() => setIsMenuOpen(false)} className="text-white text-5xl mr-3"><LucideXCircle /> </button>
                    </div>
                    <div className="flex flex-col items-center space-y-6 pt-12">
                        <Link href="/" className="text-white text-lg" onClick={() => setIsMenuOpen(false)}>{dict["header"]["home"]}</Link>
                        <Link href="/about" className="text-white text-lg" onClick={() => setIsMenuOpen(false)}>{dict["header"]["about"]}</Link>
                        <Link href="/services" className="text-white text-lg" onClick={() => setIsMenuOpen(false)}>{dict["header"]["services"]}</Link>
                        <Link href="/contact" className="text-white text-lg" onClick={() => setIsMenuOpen(false)}>{dict["header"]["contact"]}</Link>
                    </div>
                </nav>
            )}
        </header>
    );
}

const getCountryFlag = (countryCode: string) => {
    return (
        <ReactCountryFlag
            countryCode={countryCode}
            svg
        />
    )
}