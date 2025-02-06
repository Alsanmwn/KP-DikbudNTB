import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Card Stats Component
const StatsCard = ({ title, value, imagePosition = 'bottom-right' }) => {
    // Helper function to get position classes
    const getPositionClasses = (position) => {
        const positions = {
            'top-left': 'top-4 left-4',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-right': 'bottom-4 right-4'
        };
        return positions[position] || positions['bottom-right'];
    };

    return (
        <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-6 text-white relative h-full">
            <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <span className="text-5xl font-regular leading-none">{value}</span>
                <img 
                    src="/assets/visiticon.png"
                    alt="Time Illustration" 
                    className={`absolute w-64 ${getPositionClasses(imagePosition)}`}
                    style={{
                        filter: 'brightness(1.2)',
                    }}
                />
            </div>
        </div>
    );
};

// Rest of the components remain exactly the same
const IconWrapper = ({ name }) => (
    <div className="w-20 h-20 flex items-center justify-center">
        <img 
            src={`/api/placeholder/80/80?text=${name}`}
            alt={`${name} Icon`}
            className="w-full h-full object-contain"
        />
    </div>
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

const StatisticsCard = () => {
    const mockData = [
        { month: 'Jan', 'Pengajuan Surat': 65, 'Data Pendidikan': 45, 'Rumah Belajar': 55 },
        { month: 'Feb', 'Pengajuan Surat': 70, 'Data Pendidikan': 50, 'Rumah Belajar': 60 },
        { month: 'Mar', 'Pengajuan Surat': 60, 'Data Pendidikan': 55, 'Rumah Belajar': 65 },
        { month: 'Apr', 'Pengajuan Surat': 75, 'Data Pendidikan': 60, 'Rumah Belajar': 70 },
    ];

    const stats = [
        { label: 'Pengajuan Surat', value: '75%', color: '#22d3ee' },
        { label: 'Data Pendidikan', value: '60%', color: '#67e8f9' },
        { label: 'Rumah Belajar', value: '70%', color: '#a5f3fc' },
    ];

    return (
        <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-6 text-white">
            <h3 className="text-2xl font-semibold mb-6">Statistik</h3>
            <div className="flex space-x-12">
                <div className="flex flex-col space-y-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center space-x-3 mb-1">
                                <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: stat.color }}
                                />
                                <span className="text-sm">{stat.label}</span>
                            </div>
                            <span className="text-sm font-semibold ml-6">{stat.value}</span>
                        </div>
                    ))}
                </div>

                <div className="flex-1 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#fff" 
                                tick={{ fill: '#fff', fontSize: 12 }}
                            />
                            <YAxis 
                                stroke="#fff"
                                tick={{ fill: '#fff', fontSize: 12 }}
                            />
                            {stats.map((stat, index) => (
                                <Line 
                                    key={index}
                                    type="monotone" 
                                    dataKey={stat.label}
                                    stroke={stat.color}
                                    strokeWidth={2}
                                    dot={{ fill: stat.color, r: 4 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const Calendar = () => {
    const daysOfWeek = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
    
    return (
        <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Januari 2025</h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">&lt;</button>
                    <button className="p-2 hover:bg-gray-100 rounded">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="text-center p-2 font-medium">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                    <div 
                        key={i} 
                        className="text-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

const OverviewCard = ({ icon: Icon, title, value }) => (
    <div className="bg-gradient-to-r from-[#355685] to-[#696F78] rounded-lg p-4 text-white">
        <div className="flex flex-col items-center">
            <Icon />
            <span className="mt-2">{title}</span>
            <span className="font-bold">{value}</span>
        </div>
    </div>
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

    const overviewData = [
        { icon: SchoolIcon, title: 'Sekolah', value: '150' },
        { icon: StudentIcon, title: 'Siswa', value: '1500' },
        { icon: TeacherIcon, title: 'Guru', value: '100' },
        { icon: CultureIcon, title: 'Cagar Budaya', value: '85%' },
    ];

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
                        <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
                        <p className="mb-6">Email: {admin.email}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <StatsCard 
                                title="Kunjungan untuk hari ini" 
                                value="909"
                                imagePosition="bottom-right"
                            />
                            <StatisticsCard />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                {overviewData.map((item, index) => (
                                    <OverviewCard 
                                        key={index}
                                        icon={item.icon}
                                        title={item.title}
                                        value={item.value}
                                    />
                                ))}
                            </div>
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;