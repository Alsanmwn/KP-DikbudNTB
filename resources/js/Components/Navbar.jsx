import { Link } from '@inertiajs/react';


export default function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-[#223A5C] p-4 shadow-md z-50 pl-4">
            <div className="flex items-center justify-between">
                {/* Logo dan Teks kiri */}
                <div className="flex items-center pl-6">
                    <Link href={route('beranda')}>  {/* Menambahkan link di sekitar logo */}
                        <img
                            src="/assets/logobtidp.jpg"  // Ganti dengan lokasi logo Anda
                            alt="Logo BTIDP"
                            className="h-10 mr-4 cursor-pointer"  // Menambahkan cursor-pointer untuk efek kursor tangan
                        />
                    </Link>
                    <Link href={route('beranda')} className="text-white text-[22px] font-semibold cursor-pointer">
                        BTIDP
                    </Link>
                </div>
               
                {/* Menu navigasi di kanan dengan ukuran font 12px */}
                <div className="text-right pr-6">
                    <div className="flex items-center justify-end space-x-12">
                        <Link
                            href={route('beranda')}
                            className="text-white font-regular text-[16px] hover:text-gray-200"
                        >
                            Beranda
                        </Link>
                        <Link
                            href={route('tentang-kami')}
                            className="text-white font-regular text-[16px] hover:text-gray-200"
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            href={route('informasi-pendidikan')}
                            className="text-white font-regular text-[16px] hover:text-gray-200"
                        >
                            Layanan
                        </Link>
                        <Link
                            href={route('informasi-kebudayaan')}
                            className="text-white font-regular text-[16px] hover:text-gray-200"
                        >
                            Informasi Kebudayaan
                        </Link>
                        {/* <a
                            href="https://ayomi.vercel.app/"
                            target="_blank"  // Membuka link di tab baru
                            rel="noopener noreferrer"  // Menambahkan keamanan saat membuka link di tab baru
                            className="text-white font-regular text-[16px] hover:text-gray-200"
                        >
                            Informasi Kebudayaan
                        </a> */}


                        {/* {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-white font-regular text-[16px] hover:text-gray-200"
                            >
                                Alsa Nurmawan
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="text-white font-regular text-[16px] hover:text-gray-200"
                            >
                                Log in
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
