import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { utils, writeFile } from 'xlsx'; // Import dari SheetJS
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const DataPendidikan = () => {
    const [activeTab, setActiveTab] = useState('sekolah');

    // Data untuk setiap tab
    const dataSekolah = [
        { id: 1, name: 'Sekolah 1', address: 'Alamat 1' },
        { id: 2, name: 'Sekolah 2', address: 'Alamat 2' }
    ];
    const dataSiswa = [
        { id: 1, name: 'Siswa 1', class: '10A' },
        { id: 2, name: 'Siswa 2', class: '10B' }
    ];
    const dataGuru = [
        { id: 1, name: 'Guru 1', subject: 'Matematika' },
        { id: 2, name: 'Guru 2', subject: 'Bahasa Inggris' }
    ];

    // Fungsi untuk mengunduh data dalam bentuk Excel
    const downloadExcel = (data, sheetName) => {
        const worksheet = utils.json_to_sheet(data); // Konversi data ke sheet
        const workbook = utils.book_new(); // Buat workbook baru
        utils.book_append_sheet(workbook, worksheet, sheetName); // Tambahkan sheet ke workbook
        writeFile(workbook, `${sheetName}.xlsx`); // Unduh file Excel
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
                                                <th className="border px-6 py-3">ID</th>
                                                <th className="border px-6 py-3">Nama Sekolah</th>
                                                <th className="border px-6 py-3">Alamat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSekolah.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="border px-6 py-3">{item.id}</td>
                                                    <td className="border px-6 py-3">{item.name}</td>
                                                    <td className="border px-6 py-3">{item.address}</td>
                                                </tr>
                                            ))}
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
                                                <th className="border px-6 py-3">ID</th>
                                                <th className="border px-6 py-3">Nama Siswa</th>
                                                <th className="border px-6 py-3">Kelas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSiswa.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="border px-6 py-3">{item.id}</td>
                                                    <td className="border px-6 py-3">{item.name}</td>
                                                    <td className="border px-6 py-3">{item.class}</td>
                                                </tr>
                                            ))}
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
                                                <th className="border px-6 py-3">ID</th>
                                                <th className="border px-6 py-3">Nama Guru</th>
                                                <th className="border px-6 py-3">Mata Pelajaran</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataGuru.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="border px-6 py-3">{item.id}</td>
                                                    <td className="border px-6 py-3">{item.name}</td>
                                                    <td className="border px-6 py-3">{item.subject}</td>
                                                </tr>
                                            ))}
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