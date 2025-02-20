import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    const scrollToLayanan = (e) => {
        e.preventDefault();
        const layananSection = document.getElementById('layanan-kami');
        if (layananSection) {
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const sectionTop = layananSection.getBoundingClientRect().top + window.scrollY; 
            
            window.scrollTo({
                top: sectionTop - navbarHeight, 
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#223A5C] p-4 shadow-md z-50 pl-4">
            <div className="flex items-center justify-between">
                {/* Logo dan Teks kiri */}
                <div className="flex items-center pl-6">
                    <Link href={route('beranda')}>
                        <img
                            src="/assets/logobtidp.png"
                            alt="Logo BTIDP"
                            className="h-10 mr-4 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Menu navigasi di kanan */}
                <div className="text-right pr-6">
                    <div className="flex items-center justify-end space-x-12">
                        <Link href={route('beranda')} className="text-white font-regular text-[16px] hover:text-gray-200">
                            Beranda
                        </Link>
                        <Link href={route('tentang-kami')} className="text-white font-regular text-[16px] hover:text-gray-200">
                            Tentang Kami
                        </Link>
                        <a
                            href="#layanan-kami"
                            onClick={scrollToLayanan}
                            className="text-white font-regular text-[16px] hover:text-gray-200 cursor-pointer"
                        >
                            Layanan
                        </a>
                        <Link href={route('informasi-kebudayaan')} className="text-white font-regular text-[16px] hover:text-gray-200">
                            Informasi Kebudayaan
                        </Link>

                        {auth.user ? (
                            <Link
                                href={route('profile.edit')}
                                className="text-white font-regular text-[16px] hover:text-gray-200 cursor-pointer"
                            >
                                {auth.user.name}
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-white font-regular text-[16px] hover:text-gray-200">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-white font-regular text-[16px] hover:text-gray-200">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
