import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { UserIcon, HomeIcon, AcademicCapIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, ArrowRightOnRectangleIcon, BuildingOffice2Icon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const { admin } = usePage().props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const menuItems = [
        {   name: 'Dashboard', 
            route: '/admin/dashboard', 
            icon: <HomeIcon className="h-5 w-5 mr-3" /> 
        },
        {   name: 'User', 
            route: '/admin/user', 
            icon: <UserIcon className="h-5 w-5 mr-3" /> 
        },
        {   name: 'Struktur Organisasi', 
            route: '/admin/struktur-organisasi', 
            icon: <BuildingOffice2Icon className="h-5 w-5 mr-3" /> 
        },
        {
            name: 'Data Pendidikan',
            icon: <AcademicCapIcon className="h-5 w-5 mr-3" />,
            dropdown: true,
            subItems: [
                {   name: 'Data Siswa',  
                    route: '/admin/data-pendidikan/siswa' 
                },
                {   name: 'Data Guru', 
                    route: '/admin/data-pendidikan/guru' 
                },
                {   name: 'Data Sekolah', 
                    route: '/admin/data-pendidikan/sekolah' 
                },
            ],
        },
        {   name: 'Agenda BTIDP', 
            route: '/admin/agenda-btidp', 
            icon: <CalendarIcon className="h-5 w-5 mr-3" /> 
        },
        { 
            name: 'Permohonan Layanan', 
            route: '/admin/permohonan-layanan', 
            icon: <ClipboardDocumentIcon className="h-5 w-5 mr-3" 
            /> 
        },
        {   name: 'Ubah Profile', 
            route: '/admin/profile', 
            icon: <UserIcon className="h-5 w-5 mr-3" /> 
        },
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
                    Logout
                    <ArrowRightOnRectangleIcon className="h-5 w-5 ml-2" />
                </button>
            </div>

            <div className="px-4 py-2 text-sm text-center border-t border-gray-600">
                © 2025 BTIDP
            </div>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <div className="flex flex-col items-center">
                            <ArrowRightOnRectangleIcon className="h-12 w-12 text-red-600" />
                            <h2 className="text-xl font-bold text-black mt-3">Logout</h2>
                            <p className="text-gray-600 mt-1">Hi {admin?.email}</p>
                            <p className="text-gray-600 text-sm mt-1 text-center">
                                Are you sure you want to log out from My App?
                            </p>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700"
                            >
                                No
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
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
