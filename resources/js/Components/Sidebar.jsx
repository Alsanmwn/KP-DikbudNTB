import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { HomeIcon, AcademicCapIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';


const Sidebar = () => {
    const { admin } = usePage().props; // Mengambil data admin
    const [isDataPendidikanOpen, setIsDataPendidikanOpen] = useState(false); // Menangani status dropdown
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Menangani status modal logout
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Status loading untuk logout


    const menuItems = [
        { name: 'Dashboard', route: '/admin/dashboard', icon: <HomeIcon className="h-5 w-5 mr-3" /> },
        {
            name: 'Data Pendidikan',
            icon: <AcademicCapIcon className="h-5 w-5 mr-3" />,
            dropdown: true,
            subItems: [
                { name: 'Data Siswa', route: '/admin/data-pendidikan/siswa' },
                { name: 'Data Guru', route: '/admin/data-pendidikan/guru' },
                { name: 'Data Sekolah', route: '/admin/data-pendidikan/sekolah' },
            ],
        },
        { name: 'Agenda BTIDP', route: '/admin/agenda-btidp', icon: <CalendarIcon className="h-5 w-5 mr-3" /> },
        { name: 'Ubah Profile', route: '/admin/profile', icon: <UserIcon className="h-5 w-5 mr-3" /> },
    ];
       


    const handleLogout = () => {
        setIsLoggingOut(true); // Mulai loading
        router.post('/admin/logout', {
            onFinish: () => {
                setIsLoggingOut(false); // Selesai loading
                setIsLogoutModalOpen(false); // Tutup modal
                router.get('/admin/login'); // Arahkan ke halaman login setelah logout
            }
        }); // Pastikan rute logout sudah benar
    };


    const toggleDropdown = () => {
        setIsDataPendidikanOpen(!isDataPendidikanOpen); // Toggle state dropdown
    };


    const openLogoutModal = () => {
        setIsLogoutModalOpen(true); // Membuka modal konfirmasi logout
    };


    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false); // Menutup modal konfirmasi logout
    };


    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="px-6 py-4 text-lg font-bold border-b border-gray-600 text-center">
                Admin Panel
            </div>
            <ul className="flex-grow space-y-4 mt-4">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.dropdown ? (
                            <div>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center w-full px-4 py-2 hover:bg-gray-700 border-b border-gray-600"
                                >
                                    {item.icon}
                                    {item.name}
                                    <span className="ml-auto">
                                        {isDataPendidikanOpen ? (
                                            <ChevronUpIcon className="h-5 w-5" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5" />
                                        )}
                                    </span>
                                </button>
                                {isDataPendidikanOpen && (
                                    <ul className="space-y-2 ml-4">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    href={subItem.route}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-700 border-gray-600 pl-8"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={item.route}
                                className="flex items-center px-4 py-2 hover:bg-gray-700 border-b border-gray-600"
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
           
            {/* Tombol Logout dengan ikon */}
            <div className="flex justify-center items-center mt-auto mb-4">
                <button
                    onClick={openLogoutModal}
                    className="flex items-center text-red-500 text-lg hover:underline"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    Logout
                </button>
            </div>


            <div className="px-4 py-2 text-sm text-center border-t border-gray-600">
                © 2025 BTIDP
            </div>


            {/* Modal Konfirmasi Logout */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-1/3 h-1/8">
                        <div className="text-lg font-bold text-black mb-4 text-center">
                            Anda yakin mau keluar?
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={closeLogoutModal}
                                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                            >
                                No
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoggingOut} // Menonaktifkan tombol saat sedang loading
                            >
                                {isLoggingOut ? (
                                    <span className="animate-spin">🔄</span> // Menampilkan indikator loading
                                ) : (
                                    'Yes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Sidebar;
