import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Navbar from '@/Components/Navbar';
import { Link } from '@inertiajs/react';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* 🔥 Navbar dipanggil di sini */}
            <Navbar auth={auth} />

            <nav style={{ backgroundColor: '#223A5C' }} className="shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                                    <ApplicationLogo className="block h-6 w-auto fill-current text-white" />
                                </div>
                                <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
                                    Beranda
                                </span>
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:items-center gap-3">      
                                    <button
                                        type="button"
                                        className="flex items-center gap-2.5 px-3 py-1.5"
                                    >
                                        <div className="text-left hidden md:block">
                                            <p className="text-white text-sm font-semibold leading-none">
                                                {auth.user.name}
                                            </p>
                                        </div>
                                        <svg
                                            className="w-4 h-4 text-white/70 ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                        </svg>
                                    </button>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                            >
                                <svg className="h-5 w-5 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-white/10'}>
                    <div className="px-4 py-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{auth.user.name}</p>
                                <p className="text-blue-200 text-xs">{auth.user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 text-sm transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profil Saya
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
                        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#223A5C' }}></div>
                        <div>{header}</div>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}