import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const DataPendidikan = () => {
    const [activeTab, setActiveTab] = useState('sekolah');

    // Data sekolah dengan struktur yang sama
    const dataSekolah = [
        {
            kabupaten: 'Kota Mataram',
            sma: { negeri: 10, swasta: 15, total: 25 },
            smk: { negeri: 8, swasta: 12, total: 20 },
            slb: { negeri: 2, swasta: 3, total: 5 }
        },
        {
            kabupaten: 'Kota Bima',
            sma: { negeri: 8, swasta: 10, total: 18 },
            smk: { negeri: 6, swasta: 8, total: 14 },
            slb: { negeri: 1, swasta: 2, total: 3 }
        },
        {
            kabupaten: 'Kabupaten Lombok Barat',
            sma: { negeri: 12, swasta: 14, total: 26 },
            smk: { negeri: 9, swasta: 11, total: 20 },
            slb: { negeri: 2, swasta: 2, total: 4 }
        },
        {
            kabupaten: 'Kabupaten Lombok Tengah',
            sma: { negeri: 15, swasta: 18, total: 33 },
            smk: { negeri: 11, swasta: 13, total: 24 },
            slb: { negeri: 2, swasta: 3, total: 5 }
        },
        {
            kabupaten: 'Kabupaten Lombok Timur',
            sma: { negeri: 18, swasta: 20, total: 38 },
            smk: { negeri: 13, swasta: 15, total: 28 },
            slb: { negeri: 3, swasta: 3, total: 6 }
        },
        {
            kabupaten: 'Kabupaten Lombok Utara',
            sma: { negeri: 6, swasta: 8, total: 14 },
            smk: { negeri: 5, swasta: 7, total: 12 },
            slb: { negeri: 1, swasta: 2, total: 3 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa',
            sma: { negeri: 14, swasta: 16, total: 30 },
            smk: { negeri: 10, swasta: 12, total: 22 },
            slb: { negeri: 2, swasta: 2, total: 4 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa Barat',
            sma: { negeri: 7, swasta: 9, total: 16 },
            smk: { negeri: 6, swasta: 8, total: 14 },
            slb: { negeri: 1, swasta: 2, total: 3 }
        },
        {
            kabupaten: 'Kabupaten Dompu',
            sma: { negeri: 10, swasta: 12, total: 22 },
            smk: { negeri: 8, swasta: 10, total: 18 },
            slb: { negeri: 2, swasta: 1, total: 3 }
        },
        {
            kabupaten: 'Kabupaten Bima',
            sma: { negeri: 13, swasta: 15, total: 28 },
            smk: { negeri: 10, swasta: 12, total: 22 },
            slb: { negeri: 2, swasta: 2, total: 4 }
        }
    ];

// Hitung total untuk setiap jenis sekolah
const totalsSekolah = dataSekolah.reduce((acc, curr) => {
    return {
        sma: {
            negeri: acc.sma.negeri + curr.sma.negeri,
            swasta: acc.sma.swasta + curr.sma.swasta,
            total: acc.sma.total + curr.sma.total
        },
        smk: {
            negeri: acc.smk.negeri + curr.smk.negeri,
            swasta: acc.smk.swasta + curr.smk.swasta,
            total: acc.smk.total + curr.smk.total
        },
        slb: {
            negeri: acc.slb.negeri + curr.slb.negeri,
            swasta: acc.slb.swasta + curr.slb.swasta,
            total: acc.slb.total + curr.slb.total
        }
    };
}, {
    sma: { negeri: 0, swasta: 0, total: 0 },
    smk: { negeri: 0, swasta: 0, total: 0 },
    slb: { negeri: 0, swasta: 0, total: 0 }
});
    
    // Data siswa dengan 8 kabupaten dan 2 kota di NTB
    const dataSiswa = [
        {
            kabupaten: 'Kota Mataram',
            sma: { L: 5420, P: 6180, total: 11600 },
            smk: { L: 4800, P: 3960, total: 8760 },
            slb: { L: 125, P: 95, total: 220 }
        },
        {
            kabupaten: 'Kota Bima',
            sma: { L: 3250, P: 3680, total: 6930 },
            smk: { L: 2900, P: 2450, total: 5350 },
            slb: { L: 85, P: 65, total: 150 }
        },
        {
            kabupaten: 'Kabupaten Lombok Barat',
            sma: { L: 4120, P: 4550, total: 8670 },
            smk: { L: 3600, P: 3150, total: 6750 },
            slb: { L: 95, P: 75, total: 170 }
        },
        {
            kabupaten: 'Kabupaten Lombok Tengah',
            sma: { L: 4680, P: 5120, total: 9800 },
            smk: { L: 4200, P: 3680, total: 7880 },
            slb: { L: 110, P: 90, total: 200 }
        },
        {
            kabupaten: 'Kabupaten Lombok Timur',
            sma: { L: 5150, P: 5680, total: 10830 },
            smk: { L: 4500, P: 3920, total: 8420 },
            slb: { L: 120, P: 100, total: 220 }
        },
        {
            kabupaten: 'Kabupaten Lombok Utara',
            sma: { L: 2850, P: 3120, total: 5970 },
            smk: { L: 2400, P: 2150, total: 4550 },
            slb: { L: 65, P: 55, total: 120 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa',
            sma: { L: 3850, P: 4220, total: 8070 },
            smk: { L: 3300, P: 2880, total: 6180 },
            slb: { L: 90, P: 70, total: 160 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa Barat',
            sma: { L: 2620, P: 2880, total: 5500 },
            smk: { L: 2200, P: 1950, total: 4150 },
            slb: { L: 55, P: 45, total: 100 }
        },
        {
            kabupaten: 'Kabupaten Dompu',
            sma: { L: 3320, P: 3680, total: 7000 },
            smk: { L: 2900, P: 2550, total: 5450 },
            slb: { L: 75, P: 65, total: 140 }
        },
        {
            kabupaten: 'Kabupaten Bima',
            sma: { L: 4250, P: 4680, total: 8930 },
            smk: { L: 3700, P: 3250, total: 6950 },
            slb: { L: 95, P: 85, total: 180 }
        }
    ];

    // Hitung total untuk setiap jenis sekolah
    const totals = dataSiswa.reduce((acc, curr) => {
        return {
            sma: {
                L: acc.sma.L + curr.sma.L,
                P: acc.sma.P + curr.sma.P,
                total: acc.sma.total + curr.sma.total
            },
            smk: {
                L: acc.smk.L + curr.smk.L,
                P: acc.smk.P + curr.smk.P,
                total: acc.smk.total + curr.smk.total
            },
            slb: {
                L: acc.slb.L + curr.slb.L,
                P: acc.slb.P + curr.slb.P,
                total: acc.slb.total + curr.slb.total
            }
        };
    }, {
        sma: { L: 0, P: 0, total: 0 },
        smk: { L: 0, P: 0, total: 0 },
        slb: { L: 0, P: 0, total: 0 }
    });
    
    const dataGuru = [
        {
            kabupaten: 'Kota Mataram',
            sma: { L: 100, P: 610, total: 100 },
            smk: { L: 800, P: 390, total: 870 },
            slb: { L: 125, P: 95, total: 220 }
        },
        {
            kabupaten: 'Kota Bima',
            sma: { L: 320, P: 360, total: 630 },
            smk: { L: 200, P: 240, total: 550 },
            slb: { L: 85, P: 65, total: 150 }
        },
        {
            kabupaten: 'Kabupaten Lombok Barat',
            sma: { L: 420, P: 450, total: 870 },
            smk: { L: 300, P: 310, total: 670 },
            slb: { L: 95, P: 75, total: 170 }
        },
        {
            kabupaten: 'Kabupaten Lombok Tengah',
            sma: { L: 480, P: 520, total: 800 },
            smk: { L: 400, P: 360, total: 780 },
            slb: { L: 110, P: 90, total: 200 }
        },
        {
            kabupaten: 'Kabupaten Lombok Timur',
            sma: { L: 5150, P: 5680, total: 10830 },
            smk: { L: 4500, P: 3920, total: 8420 },
            slb: { L: 120, P: 100, total: 220 }
        },
        {
            kabupaten: 'Kabupaten Lombok Utara',
            sma: { L: 2850, P: 3120, total: 5970 },
            smk: { L: 2400, P: 2150, total: 4550 },
            slb: { L: 65, P: 55, total: 120 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa',
            sma: { L: 3850, P: 4220, total: 8070 },
            smk: { L: 3300, P: 2880, total: 6180 },
            slb: { L: 90, P: 70, total: 160 }
        },
        {
            kabupaten: 'Kabupaten Sumbawa Barat',
            sma: { L: 2620, P: 2880, total: 5500 },
            smk: { L: 2200, P: 1950, total: 4150 },
            slb: { L: 55, P: 45, total: 100 }
        },
        {
            kabupaten: 'Kabupaten Dompu',
            sma: { L: 3320, P: 3680, total: 7000 },
            smk: { L: 2900, P: 2550, total: 5450 },
            slb: { L: 75, P: 65, total: 140 }
        },
        {
            kabupaten: 'Kabupaten Bima',
            sma: { L: 4250, P: 4680, total: 8930 },
            smk: { L: 3700, P: 3250, total: 6950 },
            slb: { L: 95, P: 85, total: 180 }
        }
    ];

        // Hitung total untuk setiap jenis sekolah (guru)
    const totalsGuru = dataGuru.reduce((acc, curr) => {
        return {
            sma: {
                L: acc.sma.L + curr.sma.L,
                P: acc.sma.P + curr.sma.P,
                total: acc.sma.total + curr.sma.total
            },
            smk: {
                L: acc.smk.L + curr.smk.L,
                P: acc.smk.P + curr.smk.P,
                total: acc.smk.total + curr.smk.total
            },
            slb: {
                L: acc.slb.L + curr.slb.L,
                P: acc.slb.P + curr.slb.P,
                total: acc.slb.total + curr.slb.total
            }
            };
        }, {
            sma: { L: 0, P: 0, total: 0 },
            smk: { L: 0, P: 0, total: 0 },
            slb: { L: 0, P: 0, total: 0 }
        });

    // Fungsi untuk mengunduh data dalam bentuk Excel
    const downloadExcel = (data, sheetName) => {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, sheetName);
        writeFile(workbook, `${sheetName}.xlsx`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6 pt-28 pb-16">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#4A6A99] p-4 flex items-center gap-2">
                        <Link
                            href={route('beranda')}
                            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Informasi Pendidikan</h1>
                    </div>

                    <div className="flex border-b">
                        {[
                            { id: 'sekolah', label: 'Data Sekolah' },
                            { id: 'siswa', label: 'Data Siswa' },
                            { id: 'guru', label: 'Data Guru' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-1 py-4 px-6 text-center transition-colors duration-200
                                    ${activeTab === tab.id 
                                        ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                                        : 'text-gray-600 hover:text-blue-500'
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                    {activeTab === 'sekolah' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Data Sekolah</h2>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-left border">
                                    <thead>
                                        <tr>
                                            <th className="border px-6 py-3" rowSpan="2">Kabupaten/Kota</th>
                                            <th className="border px-6 py-3 text-center" colSpan="3">SMA</th>
                                            <th className="border px-6 py-3 text-center" colSpan="3">SMK</th>
                                            <th className="border px-6 py-3 text-center" colSpan="3">SLB</th>
                                        </tr>
                                        <tr>
                                            <th className="border px-6 py-3">Negeri</th>
                                            <th className="border px-6 py-3">Swasta</th>
                                            <th className="border px-6 py-3">Total</th>
                                            <th className="border px-6 py-3">Negeri</th>
                                            <th className="border px-6 py-3">Swasta</th>
                                            <th className="border px-6 py-3">Total</th>
                                            <th className="border px-6 py-3">Negeri</th>
                                            <th className="border px-6 py-3">Swasta</th>
                                            <th className="border px-6 py-3">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSekolah.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border px-6 py-3 text-blue-600 font-medium">{item.kabupaten}</td>
                                                <td className="border px-6 py-3">{item.sma.negeri}</td>
                                                <td className="border px-6 py-3">{item.sma.swasta}</td>
                                                <td className="border px-6 py-3">{item.sma.total}</td>
                                                <td className="border px-6 py-3">{item.smk.negeri}</td>
                                                <td className="border px-6 py-3">{item.smk.swasta}</td>
                                                <td className="border px-6 py-3">{item.smk.total}</td>
                                                <td className="border px-6 py-3">{item.slb.negeri}</td>
                                                <td className="border px-6 py-3">{item.slb.swasta}</td>
                                                <td className="border px-6 py-3">{item.slb.total}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-100 font-bold">
                                            <td className="border px-6 py-3 text-red-600">Total Keseluruhan</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.sma.negeri}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.sma.swasta}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.sma.total}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.smk.negeri}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.smk.swasta}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.smk.total}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.slb.negeri}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.slb.swasta}</td>
                                            <td className="border px-6 py-3 text-red-600">{totalsSekolah.slb.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={() => downloadExcel(dataSekolah, 'Data_Sekolah')}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Unduh Excel
                            </button>
                        </div>
                    )}
                        {activeTab === 'siswa' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Data Siswa</h2>
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full text-left border">
                                        <thead>
                                            <tr>
                                                <th className="border px-6 py-3" rowSpan="2">Kabupaten/Kota</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SMA</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SMK</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SLB</th>
                                            </tr>
                                            <tr>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSiswa.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border px-6 py-3 text-blue-600 font-medium">{item.kabupaten}</td>
                                                    <td className="border px-6 py-3">{item.sma.L}</td>
                                                    <td className="border px-6 py-3">{item.sma.P}</td>
                                                    <td className="border px-6 py-3">{item.sma.total}</td>
                                                    <td className="border px-6 py-3">{item.smk.L}</td>
                                                    <td className="border px-6 py-3">{item.smk.P}</td>
                                                    <td className="border px-6 py-3">{item.smk.total}</td>
                                                    <td className="border px-6 py-3">{item.slb.L}</td>
                                                    <td className="border px-6 py-3">{item.slb.P}</td>
                                                    <td className="border px-6 py-3">{item.slb.total}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-100 font-bold">
                                                <td className="border px-6 py-3 text-red-600">Total Keseluruhan</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.sma.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.sma.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.sma.total}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.smk.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.smk.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.smk.total}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.slb.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.slb.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totals.slb.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    onClick={() => downloadExcel(dataSiswa, 'Data_Siswa')}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Unduh Excel
                                </button>
                            </div>
                        )}
                        {activeTab === 'guru' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Data Guru</h2>
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full text-left border">
                                        <thead>
                                            <tr>
                                                <th className="border px-6 py-3" rowSpan="2">Kabupaten/Kota</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SMA</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SMK</th>
                                                <th className="border px-6 py-3 text-center" colSpan="3">SLB</th>
                                            </tr>
                                            <tr>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                                <th className="border px-6 py-3">L</th>
                                                <th className="border px-6 py-3">P</th>
                                                <th className="border px-6 py-3">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataGuru.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border px-6 py-3 text-blue-600 font-medium">{item.kabupaten}</td>
                                                    <td className="border px-6 py-3">{item.sma.L}</td>
                                                    <td className="border px-6 py-3">{item.sma.P}</td>
                                                    <td className="border px-6 py-3">{item.sma.total}</td>
                                                    <td className="border px-6 py-3">{item.smk.L}</td>
                                                    <td className="border px-6 py-3">{item.smk.P}</td>
                                                    <td className="border px-6 py-3">{item.smk.total}</td>
                                                    <td className="border px-6 py-3">{item.slb.L}</td>
                                                    <td className="border px-6 py-3">{item.slb.P}</td>
                                                    <td className="border px-6 py-3">{item.slb.total}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-100 font-bold">
                                                <td className="border px-6 py-3 text-red-600">Total Keseluruhan</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.sma.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.sma.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.sma.total}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.smk.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.smk.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.smk.total}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.slb.L}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.slb.P}</td>
                                                <td className="border px-6 py-3 text-red-600">{totalsGuru.slb.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    onClick={() => downloadExcel(dataGuru, 'Data_Guru')}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Unduh Excel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DataPendidikan;