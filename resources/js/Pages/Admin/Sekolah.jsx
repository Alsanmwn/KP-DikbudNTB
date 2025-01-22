// resources/js/Pages/Admin/AgendaBtidp.jsx

import React from 'react';
import Sidebar from '@/Components/Sidebar'; // Pastikan Sidebar sudah ada
import { usePage, router } from '@inertiajs/react';

const Sekolah = () => {
    const { admin } = usePage().props; // Mendapatkan data admin

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Konten Halaman */}
            <div className="flex-1">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Data Sekolah NTB</h1>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4">Welcome, {admin.name}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                {/* Konten Agenda BTIDP */}
                                <h2 className="text-lg font-semibold">Data sekolah di nusa tenggara baarat</h2>
                                <p>This is the data School page content.</p>

                                {/* Anda bisa menambahkan lebih banyak konten agenda di sini */}
                                <table className="min-w-full table-auto mt-6">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">No</th>
                                            <th className="px-4 py-2">name</th>
                                            <th className="px-4 py-2">location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Contoh data agenda */}
                                        <tr>
                                            <td className="px-4 py-2">1</td>
                                            <td className="px-4 py-2">Sman 1 belo</td>
                                            <td className="px-4 py-2">cenggu</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2">2</td>
                                            <td className="px-4 py-2">Sman 1 Woha</td>
                                            <td className="px-4 py-2">Rabakodo</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sekolah;
