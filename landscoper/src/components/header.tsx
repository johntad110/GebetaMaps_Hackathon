'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from 'react-country-flag';

export default function Header({ dict }: { dict: any }) {
    const [currentLang, setCurrentLang] = useState('am');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [currentPath, setcurrentPath] = useState('');

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
                    {/* Mobile Menu (Hamburger Icon) */}
                    <div className="md:hidden bg-white/25 rounded-md my-auto">
                        <button className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div></div>
            </div>
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