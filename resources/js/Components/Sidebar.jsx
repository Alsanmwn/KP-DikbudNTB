import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { UserIcon, HomeIcon, AcademicCapIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const { admin } = usePage().props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const menuItems = [
        { name: 'Dashboard', route: '/admin/dashboard', icon: <HomeIcon className="h-5 w-5 mr-3" /> },
        {
            name: 'User', 
            route: '/admin/user', 
            icon: <UserIcon className="h-5 w-5 mr-3" /> // Icon untuk menu User
        },
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
        setIsLoggingOut(true);
        router.post('/admin/logout', {
            onFinish: () => {
                setIsLoggingOut(false);
                setIsLogoutModalOpen(false);
                router.get('/admin/login');
            }
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-64 h-screen bg-[#223A5C] text-white flex flex-col sticky top-0 z-10">
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
                                        {isDropdownOpen ? (
                                            <ChevronUpIcon className="h-5 w-5" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5" />
                                        )}
                                    </span>
                                </button>
                                {isDropdownOpen && (
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

            <div className="flex justify-center items-center mt-auto mb-4">
                <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center text-red-500 text-lg hover:underline"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    Logout
                </button>
            </div>

            <div className="px-4 py-2 text-sm text-center border-t border-gray-600">
                © 2025 BTIDP
            </div>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-1/3 h-1/8">
                        <div className="text-lg font-bold text-black mb-4 text-center">
                            Anda yakin mau keluar?
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                            >
                                No
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <span className="animate-spin">🔄</span>
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