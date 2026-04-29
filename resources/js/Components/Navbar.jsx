import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    const isActive = (routeName) => route().current(routeName);

    const navLinkClass = (routeName) =>
        `hover:text-gray-200 ${isActive(routeName) ? 'font-bold' : 'font-normal'}`;

    const mobileLinkClass = (routeName) =>
        `${isActive(routeName) ? 'font-bold text-[#223A5C]' : 'text-gray-700'}`;

    const scrollToLayanan = (e) => {
        e.preventDefault();
        const layananSection = document.getElementById('layanan-kami');
        if (layananSection) {
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const sectionTop = layananSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: sectionTop - navbarHeight, behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-[#223A5C] shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <Link href={route('beranda')} className="flex items-center">
                            <img src="/assets/logofix.png" alt="Logo" className="h-9 sm:h-10" />
                        </Link>

                        <div className="hidden lg:flex items-center space-x-8 text-white">
                            <Link href={route('beranda')} className={navLinkClass('beranda')}>
                                Beranda
                            </Link>

                            <a href="#layanan-kami" onClick={scrollToLayanan} className="hover:text-gray-200">
                                Layanan
                            </a>

                            <Link href={route('tentang-kami')} className={navLinkClass('tentang-kami')}>
                                Tentang Kami
                            </Link>

                            <Link href={route('informasi-kebudayaan')} className={navLinkClass('informasi-kebudayaan')}>
                                Informasi Kebudayaan
                            </Link>

                            {auth.user ? (
                                <Link href={route('profile.edit')} className={navLinkClass('profile.edit')}>
                                    {auth.user.name}
                                </Link>
                            ) : (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="hover:text-gray-200"
                                    >
                                        Akun
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2">
                                            <Link href={route('login')} className="block px-4 py-2 hover:bg-gray-100">
                                                Log in
                                            </Link>
                                            <Link href={route('register')} className="block px-4 py-2 hover:bg-gray-100">
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button onClick={() => setMenuOpen(true)} className="lg:hidden text-white">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            {menuOpen && <div className="fixed inset-0 bg-black/50 z-40"></div>}

            <div
                ref={sidebarRef}
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white z-50
                    transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                    shadow-lg
                `}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-bold text-[#223A5C]">Menu</h2>
                    <button onClick={() => setMenuOpen(false)}>
                        <X size={26} />
                    </button>
                </div>

                <div className="flex flex-col p-4 space-y-4">
                    <Link href={route('beranda')} onClick={() => setMenuOpen(false)} className={mobileLinkClass('beranda')}>
                        Beranda
                    </Link>

                    <a href="#layanan-kami" onClick={scrollToLayanan} className="text-gray-700">
                        Layanan
                    </a>

                    <Link href={route('tentang-kami')} onClick={() => setMenuOpen(false)} className={mobileLinkClass('tentang-kami')}>
                        Tentang Kami
                    </Link>

                    <Link href={route('informasi-kebudayaan')} onClick={() => setMenuOpen(false)} className={mobileLinkClass('informasi-kebudayaan')}>
                        Informasi Kebudayaan
                    </Link>

                    <hr />

                    {auth.user ? (
                        <Link href={route('profile.edit')} onClick={() => setMenuOpen(false)} className={mobileLinkClass('profile.edit')}>
                            {auth.user.name}
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} onClick={() => setMenuOpen(false)} className="text-gray-700">
                                Log in
                            </Link>
                            <Link href={route('register')} onClick={() => setMenuOpen(false)} className="text-gray-700">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}