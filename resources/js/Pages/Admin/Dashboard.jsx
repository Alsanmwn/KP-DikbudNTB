import React, { useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import { MapPin, Calendar as CalendarIcon, PlusCircle, FileBarChart, CheckCircle, Clock, Settings, AlertCircle, Bell, CalendarPlus, FileText, Users, School, UserCheck } from 'lucide-react';

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ icon: Icon, title, value, sub, color }) => (
    <div
        className="rounded-2xl p-5 text-white flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
        style={{
            background: 'linear-gradient(135deg, #0f2952 0%, #1a3a6b 50%, #2d5296 100%)',
            boxShadow: '0 4px 20px rgba(26,58,107,0.28)',
        }}
    >
        <div className="flex items-center justify-between">
            <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.12)' }}
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color }}>
                {sub}
            </span>
        </div>
        <div>
            <p className="text-xs text-blue-300 uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold leading-tight">{value}</p>
        </div>
    </div>
);

// ─── Recent Users Table ───────────────────────────────────────────────────────
const RecentUsersTable = () => {
    const { users } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const roleStyle = {
        admin: "bg-red-100 text-red-600",
        anggota: "bg-green-100 text-green-600",
        umum: "bg-gray-100 text-gray-600",
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Pengguna Terdaftar</h3>

                    {/* 🔥 BUTTON BUKAN LINK */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-blue-600 hover:underline font-medium"
                    >
                        Lihat semua →
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="pb-2 font-semibold">Nama</th>
                                <th className="pb-2 font-semibold">Role</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {users && users.length > 0 ? users.slice(0, 5).map((u, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                                style={{ background: 'linear-gradient(135deg,#1a3a6b,#4a6fa5)' }}
                                            >
                                                {u.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-700">{u.name}</p>
                                                <p className="text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-2.5">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${roleStyle[u.role]}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-400">
                                        Tidak ada data pengguna
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🔥 MODAL POPUP */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg animate-fadeIn">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-700">
                                Semua Pengguna
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Table */}
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-left text-gray-400 border-b">
                                        <th className="pb-2">Nama</th>
                                        <th className="pb-2">Email</th>
                                        <th className="pb-2">Role</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {users.map((u, i) => (
                                        <tr key={i}>
                                            <td className="py-2">{u.name}</td>
                                            <td className="py-2 text-gray-500">{u.email}</td>
                                            <td className="py-2">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${roleStyle[u.role]}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

// ─── Permohonan Status ────────────────────────────────────────────────────────
const PermohonanStatus = () => {
    const { stats } = usePage().props;
    
    const data = [
        { label: 'Disetujui',  value: stats?.statusPermohonan?.disetujui ?? 0, color: '#34d399', icon: CheckCircle },
        { label: 'Diproses',   value: stats?.statusPermohonan?.diproses ?? 0, color: '#60a5fa', icon: Clock        },
        { label: 'Ditolak',    value: stats?.statusPermohonan?.ditolak ?? 0,  color: '#f87171', icon: AlertCircle  },
        { label: 'Menunggu',   value: stats?.statusPermohonan?.menunggu ?? 0, color: '#fbbf24', icon: Bell         },
    ];

    const total = data.reduce((s, d) => s + d.value, 0);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-700">Status Permohonan</h3>
                <span className="text-xs text-gray-400">{total} total</span>
            </div>
            <div className="flex flex-col gap-3">
                {data.map((item, i) => {
                    const Icon = item.icon;
                    // const pct = Math.round((item.value / total) * 100);
                    const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                    return (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                                    <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-700">{item.value} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Traffic Chart ────────────────────────────────────────────────────────────
const TrafficChart = () => {
    const { stats } = usePage().props;
    // const data = stats?.traffic ?? [];

    const data = stats?.traffic?.length
    ? stats.traffic
    : [
        { day: 'Sen', masuk: 0, keluar: 0 },
        { day: 'Sel', masuk: 0, keluar: 0 },
        { day: 'Rab', masuk: 0, keluar: 0 },
        { day: 'Kam', masuk: 0, keluar: 0 },
        { day: 'Jum', masuk: 0, keluar: 0 },
        { day: 'Sab', masuk: 0, keluar: 0 },
        { day: 'Min', masuk: 0, keluar: 0 },
    ];

    return (
        <div
            className="rounded-2xl p-6 text-white"
            style={{
                background: 'linear-gradient(135deg, #1a3a6b 0%, #2d5296 50%, #4a6fa5 100%)',
                boxShadow: '0 8px 32px rgba(26,58,107,0.35)',
            }}
        >
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-base font-bold">Trafik Permohonan</h3>
                    <p className="text-blue-300 text-xs mt-0.5">Minggu ini</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-blue-200">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] inline-block" /> Masuk</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#34d399] inline-block" /> Selesai</span>
                </div>
            </div>
            <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="day" stroke="transparent" tick={{ fill: '#93c5fd', fontSize: 11 }} />
                        <YAxis stroke="transparent" tick={{ fill: '#93c5fd', fontSize: 11 }} />
                        <Tooltip
                            contentStyle={{ background: '#1e3a6e', border: 'none', borderRadius: 12, fontSize: 12 }}
                            labelStyle={{ color: '#93c5fd' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="masuk"  fill="#60a5fa" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="keluar" fill="#34d399" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// ─── Quick Actions ──────────────────────────────────────────────────────────────
// const QuickActions = () => {
//     const actions = [
//         { label: 'Buat Kegiatan',      icon: CalendarPlus, color: '#34d399', link: '/admin/agenda-btidp' },
//         // { label: 'Tambah Data',     icon: PlusCircle,       color: '#60a5fa', link: '/admin/data/create' },
//         // { label: 'Laporan',     icon: FileBarChart,    color: '#a78bfa', link: '/admin/laporan' },
//         { label: 'Pengaturan',       icon: Settings,  color: '#fbbf24', link: '/admin/profile' },
//     ];

//     return (
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <h3 className="text-sm font-bold text-gray-700 mb-4">Aksi Cepat</h3>

//             <div className="flex flex-col gap-3">
//                 {actions.map((a, i) => {
//                     const Icon = a.icon;

//                     return (
//                         <Link
//                             key={i}
//                             href={a.link}
//                             className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100"
//                         >
//                             <Icon className="w-4 h-4" style={{ color: a.color }} />
//                             {a.label}
//                         </Link>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };
const QuickActions = () => {
    const actions = [
        { label: 'Buat Kegiatan', icon: CalendarPlus, color: '#34d399', link: '/admin/agenda-btidp' },
        { label: 'Pengaturan', icon: Settings, color: '#fbbf24', link: '/admin/profile' },
    ];

    const totalVisit = 128;

    return (
        <div className="flex flex-col gap-6">

            {/* ─── Aksi Cepat ─── */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[167px] flex flex-col">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Aksi Cepat</h3>

                <div className="flex flex-col gap-3 flex-1 justify-center">
                    {actions.map((a, i) => {
                        const Icon = a.icon;

                        return (
                            <Link
                                key={i}
                                href={a.link}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100"
                            >
                                <Icon className="w-4 h-4" style={{ color: a.color }} />
                                {a.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ─── Kunjungan Website ─── */}
            <div
                className="rounded-2xl p-5 text-white min-h-[167px] flex flex-col justify-between"
                style={{
                    background: 'linear-gradient(135deg, #1a3a6b 0%, #2d5296 50%, #4a6fa5 100%)',
                    boxShadow: '0 8px 32px rgba(26,58,107,0.35)',
                }}
            >
                <div>
                    <p className="text-blue-200 text-xs font-bold tracking-wider">
                        Kunjungan Website Masih Dummy 
                    </p>

                    <h2 className="text-3xl font-bold mt-1">
                        {totalVisit}
                    </h2>

                    <p className="text-blue-300 text-xs mt-1">
                        Hari ini
                    </p>
                </div>

                <div className="mt-4 text-xs text-blue-200">
                    📈 +12% dari kemarin
                </div>
            </div>

        </div>
    );
};

// ─── Overview Card (Dummy) ─────────────────────────────────────
const OverviewCard = () => {
    const data = [
        {
            label: 'Sekolah',
            value: '120',
            icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
            iconExtra: <polyline points="9 22 9 12 15 12 15 22"/>
        },
        {
            label: 'Siswa',
            value: '5.400',
            icon: <>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </>
        },
        {
            label: 'Guru',
            value: '320',
            icon: <>
                <circle cx="12" cy="8" r="4"/>
                <path d="M20 21a8 8 0 1 0-16 0"/>
                <line x1="12" y1="14" x2="12" y2="20"/>
                <line x1="9" y1="17" x2="15" y2="17"/>
            </>
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-5">
                Overview Data Masih Dummy
            </h3>

            <div className="grid grid-cols-3 gap-3">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="relative rounded-xl py-8 px-4 text-center overflow-hidden flex flex-col items-center gap-3 transition hover:-translate-y-1 hover:shadow-md"
                        style={{
                            background: '#EEF4FF',
                            minHeight: '160px'
                        }}
                    >
                        {/* ICON */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #1a3a6b, #2d5296)',
                                color: '#fff'
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                                style={{ stroke: '#ffffff' }}
                            >
                                {item.icon}
                                {item.iconExtra}
                            </svg>
                        </div>

                        {/* LABEL */}
                        <p
                            className="text-xs font-semibold uppercase tracking-wider m-0"
                            style={{ color: '#2d5296' }}
                        >
                            {item.label}
                        </p>

                        {/* VALUE */}
                        <p
                            className="text-4xl font-bold leading-none m-0"
                            style={{ color: '#0f2952' }}
                        >
                            {item.value}
                        </p>

                        {/* ACCENT BAR */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1"
                            style={{
                                background: 'linear-gradient(90deg, #1a3a6b, #4a6fa5)'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Statistik Card ─────────────────────────────────────────────
const StatistikCard = () => {
    const { stats } = usePage().props;

    const totalUser = stats?.totalUser ?? 1;

    // 🔥 BATASI MAX 100%
    const pengajuanPct = Math.min(
        100,
        Math.round((stats?.totalPermohonan ?? 0) / totalUser * 100)
    );

    const eventPct = Math.min(
        100,
        Math.round((stats?.totalPendaftar ?? 0) / totalUser * 100)
    );

    const chartData = stats?.statistikAktivitas?.length
        ? stats.statistikAktivitas.map(item => ({
            name: item.label,
            permohonan: item.permohonan,
            event: item.event,
        }))
        : [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;

        return (
            <div className="bg-white shadow-md border rounded-lg px-3 py-2 text-xs">
                <p className="text-gray-400 mb-1">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }}>
                        {p.name}: {p.value}%
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">

            {/* HEADER */}
            <h3 className="text-sm font-bold text-gray-700 mb-3">
                Statistik Aktivitas
            </h3>

            {/* CHART ONLY (hapus angka besar) */}
            <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>

                        <CartesianGrid stroke="#f1f5f9" vertical={false} />

                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            // domain={[0, 100]}
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            // tickFormatter={(v) => `${v}%`}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="permohonan"
                            name="Permohonan"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="event"
                            name="Event"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* LEGEND */}
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                    <span className="w-3 h-1 bg-blue-500 rounded-full"></span>
                    Permohonan
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-3 h-1 bg-green-500 rounded-full"></span>
                    Event
                </span>
            </div>

        </div>
    );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
    // const { admin, stats } = usePage().props;
    // const { admin, stats = {} } = usePage().props;
    const { auth, stats } = usePage().props;
    const admin = auth?.user;
    
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // useEffect(() => {
    //     if (!admin) router.visit('/admin/login');
    // }, [admin]);
    useEffect(() => {
        if (admin === null) {
            router.visit('/admin/login');
        }
    }, [admin]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        return date.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    // console.log('PROPS:', usePage().props);
    console.log('AUTH:', auth);
    // if (!admin) return null;
    // if (!admin) return <div>Loading...</div>;
    if (!admin) return <div>Belum login...</div>;

    const summaryData = [
        { icon: FileText,    title: 'Total Permohonan',  value: stats?.totalPermohonan ?? 0,   sub: 'Data terbaru', color: '#60a5fa' },
        { icon: CheckCircle, title: 'Permohonan Selesai', value: stats?.permohonanSelesai ?? 0,  sub: 'Data terbaru',  color: '#34d399' },
        { icon: FileText,    title: 'Total Pendaftar Event',    value: stats?.totalPendaftar ?? 0,   sub: 'Data terbaru', color: '#a78bfa' },
    ];

    return (
        <div className="flex min-h-screen" style={{ background: '#f0f4f8' }}>
            <Sidebar />

            <div className="flex-1 min-w-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10 space-y-6">

                    {/* ── Welcome Banner ── */}
                    <div
                        className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-white"
                        style={{
                            background: 'linear-gradient(135deg, #0f2952 0%, #1a3a6b 40%, #2d5296 75%, #4a6fa5 100%)',
                            boxShadow: '0 8px 40px rgba(15,41,82,0.4)',
                            minHeight: '10rem',
                        }}
                    >
                        <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#93c5fd,transparent)' }} />
                        <div className="absolute -bottom-12 right-32 w-60 h-60 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#a78bfa,transparent)' }} />

                        <div className="relative z-10">
                            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">Dashboard Admin</p>
                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                                Selamat Datang, {admin.name}! 👋
                            </h1>
                            <p className="text-blue-200 text-sm mt-1">Siap untuk membuat perbedaan hari ini?</p>
                        </div>

                    </div>

                    {/* ── Row 1: Summary Cards ── */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {summaryData.map((item, i) => (
                            <SummaryCard key={i} {...item} />
                        ))}
                    </div>

                    {/* ── Row 1.5: Overview & Statistik ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <OverviewCard />
                        <StatistikCard />
                    </div>

                    {/* ── Row 2: Traffic Chart + Permohonan Status ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <TrafficChart />
                        </div>
                        <PermohonanStatus />
                    </div>

                    {/* ── Row 3: Recent Users + System Info ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <RecentUsersTable />
                        </div>
                        <QuickActions />
                    </div>

                    {/* ── Footer ── */}
                    <div
                        className="rounded-xl p-4 sm:p-6 text-white"
                        style={{
                            background: 'linear-gradient(135deg, #0f2952 0%, #1a3a6b 40%, #2d5296 75%, #4a6fa5 100%)',
                            boxShadow: '0 4px 20px rgba(26,58,107,0.28)',
                        }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-blue-200">
                                    Balai Teknologi Informasi & Data Pendidikan
                                </h3>
                                <p className="text-blue-300 text-xs sm:text-sm">Melayani dengan sepenuh hati</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-blue-200">
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{formatDateTime(currentDateTime)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Nusa Tenggara Barat</span>
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