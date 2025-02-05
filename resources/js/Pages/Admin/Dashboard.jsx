import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

const VisitIcon = () => (
    <img src="/assets/visiticon.png" alt="Visit Icon" className="w-38 h-38 relative" />
);

const SchoolIcon = () => (
    <img src="/assets/School.png" alt="School Icon" className="w-20 h-21 relative" />
);

const StudentIcon = () => (
    <img src="/assets/Students.png" alt="Student Icon" className="w-20 h-21 relative" />
);

const TeacherIcon = () => (
    <img src="/assets/Study.png" alt="Teacher Icon" className="w-20 h-21 relative" />
);

const CultureIcon = () => (
    <img src="/assets/Budaya.png" alt="Culture Icon" className="w-20 h-21 relative" />
);

const Dashboard = () => {
    const { admin } = usePage().props;

    useEffect(() => {
        if (!admin) {
            router.visit('/admin/login');
        }
    }, [admin]);

    if (!admin) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4">Welcome, {admin.name}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-6 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-lg font-semibold mb-4">Dashboard Content</h2>
                        <p className="mb-6">Email: {admin.email}</p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Visits Card */}
                            <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-6 text-white">
                                <h3 className="text-lg ">Kunjungan untuk hari ini</h3>
                                <div className="flex items-center justify-between"> {/* Flex untuk horizontal dan justify untuk ruang antar elemen */}
                                    <span className="text-4xl font-bold">909</span>
                                    <VisitIcon /> {/* Ikon di sebelah kanan */}
                                </div>
                            </div>


                            {/* Statistics Card */}
                            <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-6 text-white">
                                <h3 className="text-lg mb-4">Statistik</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span>Jumlah Pendidikan</span>
                                        <div className="w-24 h-4 bg-blue-400 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Jumlah Pembelajaran</span>
                                        <div className="w-32 h-4 bg-blue-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Overview Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-4 text-white">
                                    <div className="flex flex-col items-center">
                                        <SchoolIcon />
                                        <span className="mt-2">Sekolah</span>
                                        <span className="font-bold">XXX</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-4 text-white">
                                    <div className="flex flex-col items-center">
                                        <StudentIcon />
                                        <span className="mt-2">Siswa</span>
                                        <span className="font-bold">XXX</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-4 text-white">
                                    <div className="flex flex-col items-center">
                                        <TeacherIcon />
                                        <span className="mt-2">Guru</span>
                                        <span className="font-bold">XXX</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-4 text-white">
                                    <div className="flex flex-col items-center">
                                        <CultureIcon />
                                        <span className="mt-2">Capaian Budaya</span>
                                        <span className="font-bold">XXX</span>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar remains unchanged */}
                            <div className="bg-white rounded-lg p-6 shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Januari 2025</h3>
                                    <div className="flex gap-2">
                                        <button className="p-1">&lt;</button>
                                        <button className="p-1">&gt;</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    <div className="text-center p-2">M</div>
                                    <div className="text-center p-2">S</div>
                                    <div className="text-center p-2">S</div>
                                    <div className="text-center p-2">R</div>
                                    <div className="text-center p-2">K</div>
                                    <div className="text-center p-2">J</div>
                                    <div className="text-center p-2">S</div>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <div key={i} className="text-center p-2 hover:bg-gray-100 rounded">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;