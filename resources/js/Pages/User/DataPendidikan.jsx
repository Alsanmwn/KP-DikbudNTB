import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import axios from 'axios';

const DataPendidikan = () => {
    const [activeTab, setActiveTab] = useState('sekolah');
    const [level, setLevel] = useState('kabupaten');
    const [data, setData] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState(null);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [schoolDetail, setSchoolDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fungsi fetch data berdasarkan level dan seleksi
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                let url = '/api/sekolah-summary';
                
                // Menentukan URL API berdasarkan level dan seleksi
                if (level === 'kecamatan' && selectedKabupaten) {
                    url = `/api/sekolah-summary/${selectedKabupaten}`;
                } else if (level === 'sekolah' && selectedKabupaten && selectedKecamatan) {
                    url = `/api/sekolah-detail/${selectedKabupaten}/${selectedKecamatan}`;
                } else if (level === 'detail' && selectedSchool) {
                    url = `/api/sekolah-full/${selectedSchool}`;
                }
                
                console.log('Fetching data from:', url);
                
                const response = await axios.get(url);
                console.log('Data received:', response.data);
                
                if (level === 'detail') {
                    setSchoolDetail(response.data);
                } else {
                    setData(response.data);
                }
                
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Gagal mengambil data. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [level, selectedKabupaten, selectedKecamatan, selectedSchool]);

    const handleKabupatenClick = (kabupaten) => {
        setSelectedKabupaten(kabupaten);
        setLevel('kecamatan');
    };

    const handleKecamatanClick = (kecamatan) => {
        setSelectedKecamatan(kecamatan);
        setLevel('sekolah');
    };

    const handleSchoolClick = (schoolId) => {
        setSelectedSchool(schoolId);
        setLevel('detail');
    };

    const handleBack = () => {
        if (level === 'detail') {
            setSelectedSchool(null);
            setLevel('sekolah');
        } else if (level === 'sekolah') {
            setSelectedKecamatan(null);
            setLevel('kecamatan');
        } else if (level === 'kecamatan') {
            setSelectedKabupaten(null);
            setLevel('kabupaten');
        }
    };

    const renderSchoolDetails = () => {
        const school = schoolDetail;
        if (!school) return <p>Memuat data sekolah...</p>;
        
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Identitas Sekolah</h3>
                        <div className="grid gap-2">
                            <div><span className="font-medium">Nama:</span> {school.nama}</div>
                            <div><span className="font-medium">NPSN:</span> {school.npsn}</div>
                            <div><span className="font-medium">Kepala Sekolah:</span> {school.kepala_sekolah || '-'}</div>
                            <div><span className="font-medium">Akreditasi:</span> {school.akreditasi || '-'}</div>
                            <div><span className="font-medium">Status:</span> {school.status}</div>
                            <div><span className="font-medium">Bentuk Pendidikan:</span> {school.bp}</div>
                            <div><span className="font-medium">Status Kepemilikan:</span> {school.status_kepemilikan}</div>
                            <div><span className="font-medium">SK Pendirian:</span> {school.sk_pendirian}</div>
                            <div><span className="font-medium">Tanggal SK Pendirian:</span> {school.tgl_sk_pendirian}</div>
                            <div><span className="font-medium">SK Izin Operasional:</span> {school.sk_izin_operasional || '-'}</div>
                            <div><span className="font-medium">Tanggal SK Izin:</span> {school.tgl_sk_izin || '-'}</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Kontak Sekolah</h3>
                        <div className="grid gap-2">
                            <div><span className="font-medium">Alamat:</span> {school.alamat || '-'}</div>
                            <div><span className="font-medium">Kecamatan:</span> {school.kecamatan || '-'}</div>
                            <div><span className="font-medium">Kabupaten:</span> {school.kabupaten || '-'}</div>
                            <div><span className="font-medium">Provinsi:</span> {school.provinsi || '-'}</div>
                            <div><span className="font-medium">Kode Pos:</span> {school.kode_pos || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        if (loading) {
            return <p className="text-center py-4">Memuat data...</p>;
        }

        if (error) {
            return <p className="text-center py-4 text-red-500">{error}</p>;
        }

        if (level === 'detail') {
            return renderSchoolDetails();
        }

        if (level === 'sekolah') {
            return (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">No</th>
                                <th className="border px-4 py-2">Nama Sekolah</th>
                                <th className="border px-4 py-2">NPSN</th>
                                <th className="border px-4 py-2">BP</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Guru</th>
                                <th className="border px-4 py-2">Pegawai</th>
                                <th className="border px-4 py-2">Ruang Kelas</th>
                                <th className="border px-4 py-2">Ruang Lab</th>
                                <th className="border px-4 py-2">Ruang Perpus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((school, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td 
                                        className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                        onClick={() => handleSchoolClick(school.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{school.nama}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{school.npsn}</td>
                                    <td className="border px-4 py-2">{school.bp}</td>
                                    <td className="border px-4 py-2">{school.status}</td>
                                    <td className="border px-4 py-2">{school.jumlah_guru}</td>
                                    <td className="border px-4 py-2">{school.jumlah_pegawai}</td>
                                    <td className="border px-4 py-2">{school.ruang_kelas}</td>
                                    <td className="border px-4 py-2">{school.ruang_lab}</td>
                                    <td className="border px-4 py-2">{school.ruang_perpus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (level === 'kecamatan') {
            return (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" rowSpan="2">No</th>
                                <th className="border px-4 py-2" rowSpan="2">Kecamatan</th>
                                <th className="border px-4 py-2 text-center" colSpan="3">SMA</th>
                                <th className="border px-4 py-2 text-center" colSpan="3">SMK</th>
                                <th className="border px-4 py-2 text-center" colSpan="3">SLB</th>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2">N</th>
                                <th className="border px-4 py-2">S</th>
                                <th className="border px-4 py-2">Jml</th>
                                <th className="border px-4 py-2">N</th>
                                <th className="border px-4 py-2">S</th>
                                <th className="border px-4 py-2">Jml</th>
                                <th className="border px-4 py-2">N</th>
                                <th className="border px-4 py-2">S</th>
                                <th className="border px-4 py-2">Jml</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td 
                                        className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                        onClick={() => handleKecamatanClick(item.wilayah)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{item.wilayah}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{item.sma_n}</td>
                                    <td className="border px-4 py-2">{item.sma_s}</td>
                                    <td className="border px-4 py-2">{item.sma_jml}</td>
                                    <td className="border px-4 py-2">{item.smk_n}</td>
                                    <td className="border px-4 py-2">{item.smk_s}</td>
                                    <td className="border px-4 py-2">{item.smk_jml}</td>
                                    <td className="border px-4 py-2">{item.slb_n}</td>
                                    <td className="border px-4 py-2">{item.slb_s}</td>
                                    <td className="border px-4 py-2">{item.slb_jml}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Level Kabupaten (default view)
        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2" rowSpan="2">No</th>
                            <th className="border px-4 py-2" rowSpan="2">Kabupaten/Kota</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMA</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMK</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SLB</th>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2">N</th>
                            <th className="border px-4 py-2">S</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">N</th>
                            <th className="border px-4 py-2">S</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">N</th>
                            <th className="border px-4 py-2">S</th>
                            <th className="border px-4 py-2">Jml</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td 
                                    className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                    onClick={() => handleKabupatenClick(item.wilayah)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.wilayah}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{item.sma_n}</td>
                                <td className="border px-4 py-2">{item.sma_s}</td>
                                <td className="border px-4 py-2">{item.sma_jml}</td>
                                <td className="border px-4 py-2">{item.smk_n}</td>
                                <td className="border px-4 py-2">{item.smk_s}</td>
                                <td className="border px-4 py-2">{item.smk_jml}</td>
                                <td className="border px-4 py-2">{item.slb_n}</td>
                                <td className="border px-4 py-2">{item.slb_s}</td>
                                <td className="border px-4 py-2">{item.slb_jml}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const downloadExcel = () => {
        let exportData;
        
        if (level === 'detail') {
            // Ekspor detail sekolah sebagai satu baris data
            exportData = [schoolDetail];
        } else {
            // Ekspor data tabel
            exportData = data;
        }
        
        try {
            const worksheet = utils.json_to_sheet(exportData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Data Sekolah');
            writeFile(workbook, `data_pendidikan_${level}.xlsx`);
        } catch (err) {
            console.error('Error exporting excel:', err);
            alert('Gagal mengunduh data Excel. Silakan coba lagi.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-6">
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
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSelectedKabupaten(null);
                                    setSelectedKecamatan(null);
                                    setSelectedSchool(null);
                                    setLevel('kabupaten');
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {/* Breadcrumb navigation */}
                        {(selectedKabupaten || selectedKecamatan || selectedSchool) && (
                            <div className="mb-4">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Kembali</span>
                                </button>
                                
                                <div className="text-sm text-gray-500 mt-2">
                                    {level === 'kecamatan' && (
                                        <span>Kabupaten/Kota: <b>{selectedKabupaten}</b></span>
                                    )}
                                    {level === 'sekolah' && (
                                        <span>Kabupaten/Kota: <b>{selectedKabupaten}</b> &gt; Kecamatan: <b>{selectedKecamatan}</b></span>
                                    )}
                                    {level === 'detail' && schoolDetail && (
                                        <span>Detail Sekolah: <b>{schoolDetail.nama}</b></span>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {renderTable()}

                        {!loading && data.length > 0 && (
                            <button
                                onClick={downloadExcel}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Unduh Excel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPendidikan;