import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
  UserIcon,
  HomeIcon,
  AcademicCapIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightOnRectangleIcon,
  BuildingOffice2Icon,
  ClipboardDocumentIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { url, props } = usePage();
  const { admin } = props;

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: <HomeIcon className="h-5 w-5 mr-3" /> },
    { name: 'User', route: '/admin/user', icon: <UserIcon className="h-5 w-5 mr-3" /> },
    { name: 'Struktur Organisasi', route: '/admin/struktur-organisasi', icon: <BuildingOffice2Icon className="h-5 w-5 mr-3" /> },
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
    { name: 'Permohonan Layanan', route: '/admin/permohonan-layanan', icon: <ClipboardDocumentIcon className="h-5 w-5 mr-3" /> },
    { name: 'Ubah Profile', route: '/admin/profile', icon: <UserIcon className="h-5 w-5 mr-3" /> },
  ];

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.dropdown && item.subItems) {
        const isSubItemActive = item.subItems.some((subItem) =>
          url.startsWith(subItem.route)
        );
        if (isSubItemActive) {
          setOpenDropdown(item.name);
        }
      }
    });
  }, [url]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    router.post('/admin/logout', {
      onFinish: () => {
        setIsLoggingOut(false);
        setIsLogoutModalOpen(false);
        router.get('/admin/login');
      },
    });
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isActive = (route) => url.startsWith(route);

  const isDropdownActive = (item) => {
    if (item.dropdown && item.subItems) {
      return item.subItems.some((subItem) => url.startsWith(subItem.route));
    }
    return false;
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#223A5C] text-white p-2 rounded-lg shadow"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen
          bg-white text-gray-800
          flex flex-col
          border-r shadow-md z-50
          transform transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
          w-64
        `}
      >
        
      <div className="flex-shrink-0 px-4 py-4 flex items-center border-b relative">

        {!isCollapsed && (
          <div className="flex items-center gap-3 w-full">
            
            <img
              src="/assets/logocrop.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />

            <div className="flex flex-col leading-tight">
              <span className="text-[#1E3A8A] font-bold text-base">
                BTIDP
              </span>
              <span className="text-gray-500 font-bold text-[10px]">
                Balai Teknologi Informasi & Data Pendidikan
              </span>
            </div>

          </div>
        )}

        <button
          className="lg:hidden absolute right-4"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <button
          className="hidden lg:flex items-center justify-center absolute right-2 text-[#223A5C] hover:bg-gray-100 rounded p-1"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            if (!isCollapsed) setOpenDropdown(null);
          }}
        >
          {isCollapsed ? (
            <Bars3Icon className="h-5 w-5" />
          ) : (
            <XMarkIcon className="h-5 w-5" />
          )}
        </button>
      </div>

        <ul className="flex-1 min-h-0 overflow-y-auto space-y-1 mt-2 py-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => !isCollapsed && toggleDropdown(item.name)}
                    title={isCollapsed ? item.name : ''}
                    className={`flex items-center w-[90%] mx-auto px-4 py-2 rounded-md transition ${
                      isDropdownActive(item)
                        ? 'bg-[#223A5C] text-white font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    {/* Icon tanpa mr-3 saat collapsed */}
                    <span className={isCollapsed ? '' : 'mr-3'}>
                      <AcademicCapIcon className="h-5 w-5" />
                    </span>
                    {!isCollapsed && (
                      <>
                        {item.name}
                        <span className="ml-auto">
                          {openDropdown === item.name ? (
                            <ChevronUpIcon className="h-5 w-5" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5" />
                          )}
                        </span>
                      </>
                    )}
                  </button>

                  {openDropdown === item.name && !isCollapsed && (
                    <ul className="space-y-1 ml-6 mt-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.route}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center w-[85%] px-4 py-2 pl-6 rounded-md ${
                              isActive(subItem.route)
                                ? 'bg-[#3B5F95] text-white font-semibold'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
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
                  onClick={() => setIsOpen(false)}
                  title={isCollapsed ? item.name : ''}
                  className={`flex items-center w-[90%] mx-auto px-4 py-2 rounded-md ${
                    isActive(item.route)
                      ? 'bg-[#223A5C] text-white font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  {/* Render icon tanpa mr-3 saat collapsed */}
                  <span className={isCollapsed ? '' : 'mr-3'}>
                    {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
                  </span>
                  {!isCollapsed && item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex-shrink-0 flex justify-center items-center py-4">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? 'Logout' : ''}
            className={`flex items-center text-red-600 text-base hover:underline ${isCollapsed ? 'justify-center' : ''}`}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="flex-shrink-0 px-4 py-2 text-[11px] text-center border-t text-gray-500">
            © 2025 Admin Panel
          </div>
        )}
      </div>

      <div
        className={`
          hidden lg:block flex-shrink-0 transition-all duration-300
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      />

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-bold mt-3">Konfirmasi Logout</h2>
            <p className="text-gray-600 text-sm mt-2">Yakin ingin keluar?</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-md"
              >
                {isLoggingOut ? 'Loading...' : 'Ya, Keluar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;