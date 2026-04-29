import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
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
    
    // Data siswa
    const [siswaData, setSiswaData] = useState([]);
    const [siswaGenderStats, setSiswaGenderStats] = useState({});
    const [siswaDetail, setSiswaDetail] = useState(null);
    const [siswaFilter, setSiswaFilter] = useState({ jenisKelamin: 'semua' });
    
    // Data guru
    const [guruData, setGuruData] = useState([]);
    const [guruGenderStats, setGuruGenderStats] = useState({});
    const [guruDetail, setGuruDetail] = useState(null);
    const [guruFilter, setGuruFilter] = useState({ jenisKelamin: 'semua' });

    // Fungsi fetch data berdasarkan level dan seleksi
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                let url = '/api/sekolah-summary';
                
                // Tab Sekolah - Menentukan URL API berdasarkan level dan seleksi
                if (activeTab === 'sekolah') {
                    if (level === 'kecamatan' && selectedKabupaten) {
                        url = `/api/sekolah-summary/${selectedKabupaten}`;
                    } else if (level === 'sekolah' && selectedKabupaten && selectedKecamatan) {
                        url = `/api/sekolah-detail/${selectedKabupaten}/${selectedKecamatan}`;
                    } else if (level === 'detail' && selectedSchool) {
                        url = `/api/sekolah-full/${selectedSchool}`;
                    }
                }
                // Tab Siswa - URL API untuk data siswa
                else if (activeTab === 'siswa') {
                    if (level === 'kabupaten') {
                        url = '/api/siswa-summary'; // Ringkasan data siswa per kabupaten
                    } else if (level === 'kecamatan' && selectedKabupaten) {
                        url = `/api/siswa-summary/${selectedKabupaten}`; // Data siswa per kecamatan
                    } else if (level === 'sekolah' && selectedKabupaten && selectedKecamatan) {
                        url = `/api/siswa-by-sekolah/${selectedKabupaten}/${selectedKecamatan}`; // Data siswa per sekolah
                    } else if (level === 'detail' && selectedSchool) {
                        url = `/api/siswa-detail/${selectedSchool}`; // Daftar siswa di sekolah tertentu
                    }
                }
                // Tab Guru
                else if (activeTab === 'guru') {
                    if (level === 'kabupaten') {
                        url = '/api/guru-summary'; // Ringkasan data guru per kabupaten
                    } else if (level === 'kecamatan' && selectedKabupaten) {
                        url = `/api/guru-summary/${selectedKabupaten}`; // Data guru per kecamatan
                    } else if (level === 'sekolah' && selectedKabupaten && selectedKecamatan) {
                        url = `/api/guru-by-sekolah/${selectedKabupaten}/${selectedKecamatan}`; // Data guru per sekolah
                    } else if (level === 'detail' && selectedSchool) {
                        url = `/api/guru-detail/${selectedSchool}`; // Daftar guru di sekolah tertentu
                    }
                }
                
                console.log('Mengambil data dari:', url);
                
                const response = await axios.get(url);
                console.log('Data diterima:', response.data);
                
                if (activeTab === 'siswa') {
                    if (level === 'detail' && selectedSchool) {
                        setSiswaData(response.data);
                        
                        // Calculate gender stats
                        const maleCount = response.data.filter(s => s.jenis_kelamin === 'Laki-laki').length;
                        const femaleCount = response.data.filter(s => s.jenis_kelamin === 'Perempuan').length;
                        setSiswaGenderStats({
                            male: maleCount,
                            female: femaleCount,
                            total: response.data.length
                        });
                    } else {
                        setData(response.data);
                    }
                } 
                else if (activeTab === 'guru') {
                    if (level === 'detail' && selectedSchool) {
                        setGuruData(response.data);
                        
                        // Calculate gender stats for teachers
                        const maleCount = response.data.filter(g => g.jenis_kelamin === 'Laki-laki').length;
                        const femaleCount = response.data.filter(g => g.jenis_kelamin === 'Perempuan').length;
                        setGuruGenderStats({
                            male: maleCount,
                            female: femaleCount,
                            total: response.data.length
                        });
                    } else {
                        setData(response.data);
                    }
                }
                else {
                    if (level === 'detail') {
                        setSchoolDetail(response.data);
                    } else {
                        setData(response.data);
                    }
                }
                
            } catch (err) {
                console.error('Kesalahan mengambil data:', err);
                setError('Gagal mengambil data. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [activeTab, level, selectedKabupaten, selectedKecamatan, selectedSchool, siswaFilter, guruFilter]);

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
            setSiswaDetail(null);
            setGuruDetail(null);
        } else if (level === 'sekolah') {
            setSelectedKecamatan(null);
            setLevel('kecamatan');
        } else if (level === 'kecamatan') {
            setSelectedKabupaten(null);
            setLevel('kabupaten');
        }
    };

    const handleSiswaDetail = (siswaId) => {
        // Fungsi untuk melihat detail siswa tertentu
        setSiswaDetail(siswaData.find(siswa => siswa.id === siswaId));
    };

    const handleGuruDetail = (guruId) => {
        // Fungsi untuk melihat detail guru tertentu
        setGuruDetail(guruData.find(guru => guru.id === guruId));
    };

    const handleJenisKelaminFilter = (jenisKelamin) => {
        if (activeTab === 'siswa') {
            setSiswaFilter({...siswaFilter, jenisKelamin});
        } else if (activeTab === 'guru') {
            setGuruFilter({...guruFilter, jenisKelamin});
        }
    };

    const renderSiswaDetails = () => {
        if (!siswaDetail) return null;
        
        return (
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Detail Siswa</h3>
                <button 
                    onClick={() => setSiswaDetail(null)}
                    className="text-blue-600 flex items-center gap-1 mb-2"
                >
                    <ChevronLeft className="w-4 h-4" /> Kembali ke daftar
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-medium">ID:</span> {siswaDetail.id}</p>
                        <p><span className="font-medium">Jenis Kelamin:</span> {siswaDetail.jenis_kelamin}</p>
                        <p><span className="font-medium">Sekolah:</span> {siswaDetail.sekolah?.nama || '-'}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderGuruDetails = () => {
        if (!guruDetail) return null;
        
        return (
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Detail Guru</h3>
                <button 
                    onClick={() => setGuruDetail(null)}
                    className="text-blue-600 flex items-center gap-1 mb-2"
                >
                    <ChevronLeft className="w-4 h-4" /> Kembali ke daftar
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-medium">ID:</span> {guruDetail.id}</p>
                        <p><span className="font-medium">Jenis Kelamin:</span> {guruDetail.jenis_kelamin}</p>
                        <p><span className="font-medium">Sekolah:</span> {guruDetail.sekolah?.nama || '-'}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderSiswaTable = () => {
        if (level === 'detail' && selectedSchool) {
            return (
                <div className="space-y-4">
                    {siswaDetail ? (
                        renderSiswaDetails()
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Daftar Siswa</h3>
                                <div className="flex gap-2">
                                    <select 
                                        className="border rounded px-3 py-1"
                                        value={siswaFilter.jenisKelamin}
                                        onChange={(e) => handleJenisKelaminFilter(e.target.value)}
                                    >
                                        <option value="semua">Semua Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                            </div>
    
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-left border">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">No</th>
                                            <th className="border px-4 py-2">ID</th>
                                            <th className="border px-4 py-2">Jenis Kelamin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siswaData
                                            .filter(siswa => siswaFilter.jenisKelamin === 'semua' || siswa.jenis_kelamin === siswaFilter.jenisKelamin)
                                            .map((siswa, index) => (
                                                <tr key={siswa.id}>
                                                    <td className="border px-4 py-2">{index + 1}</td>
                                                    <td 
                                                        className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                                        onClick={() => handleSiswaDetail(siswa.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{siswa.id}</span>
                                                            <ChevronRight className="w-4 h-4" />
                                                        </div>
                                                    </td>
                                                    <td className="border px-4 py-2">{siswa.jenis_kelamin}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-md font-medium mb-2">Statistik Siswa</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-100 p-3 rounded">
                                        <div className="text-lg font-medium">{siswaGenderStats.male || 0}</div>
                                        <div className="text-sm text-gray-600">Laki-laki</div>
                                    </div>
                                    <div className="bg-pink-100 p-3 rounded">
                                        <div className="text-lg font-medium">{siswaGenderStats.female || 0}</div>
                                        <div className="text-sm text-gray-600">Perempuan</div>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded">
                                        <div className="text-lg font-medium">{siswaGenderStats.total || 0}</div>
                                        <div className="text-sm text-gray-600">Total</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            );
        }
    
        // For kabupaten/kecamatan/sekolah levels in siswa tab, show gender breakdown by school type
        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2" rowSpan="2">No</th>
                            <th className="border px-4 py-2" rowSpan="2">
                                {level === 'kabupaten' ? 'Kabupaten/Kota' : 
                                 level === 'kecamatan' ? 'Kecamatan' : 'Sekolah'}
                            </th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMA</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMK</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SLB</th>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td 
                                    className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                    onClick={() => {
                                        if (level === 'kabupaten') handleKabupatenClick(item.wilayah);
                                        else if (level === 'kecamatan') handleKecamatanClick(item.wilayah);
                                        else if (level === 'sekolah') handleSchoolClick(item.id);
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.wilayah || item.nama}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{item.sma_l}</td>
                                <td className="border px-4 py-2">{item.sma_p}</td>
                                <td className="border px-4 py-2">{(Number(item.sma_l) || 0) + (Number(item.sma_p) || 0)}</td>
                                <td className="border px-4 py-2">{item.smk_l}</td>
                                <td className="border px-4 py-2">{item.smk_p}</td>
                                <td className="border px-4 py-2">{(Number(item.smk_l) || 0) + (Number(item.smk_p) || 0)}</td>
                                <td className="border px-4 py-2">{item.slb_l}</td>
                                <td className="border px-4 py-2">{item.slb_p}</td>
                                <td className="border px-4 py-2">{(Number(item.slb_l) || 0) + (Number(item.slb_p) || 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderGuruTable = () => {
        if (level === 'detail' && selectedSchool) {
            return (
                <div className="space-y-4">
                    {guruDetail ? (
                        renderGuruDetails()
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Daftar Guru</h3>
                                <div className="flex gap-2">
                                    <select 
                                        className="border rounded px-3 py-1"
                                        value={guruFilter.jenisKelamin}
                                        onChange={(e) => handleJenisKelaminFilter(e.target.value)}
                                    >
                                        <option value="semua">Semua Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                            </div>
    
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-left border">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">No</th>
                                            <th className="border px-4 py-2">ID</th>
                                            <th className="border px-4 py-2">Jenis Kelamin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guruData
                                            .filter(guru => guruFilter.jenisKelamin === 'semua' || guru.jenis_kelamin === guruFilter.jenisKelamin)
                                            .map((guru, index) => (
                                                <tr key={guru.id}>
                                                    <td className="border px-4 py-2">{index + 1}</td>
                                                    <td 
                                                        className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                                        onClick={() => handleGuruDetail(guru.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{guru.id}</span>
                                                            <ChevronRight className="w-4 h-4" />
                                                        </div>
                                                    </td>
                                                    <td className="border px-4 py-2">{guru.jenis_kelamin}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-md font-medium mb-2">Statistik Guru</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-100 p-3 rounded">
                                        <div className="text-lg font-medium">{guruGenderStats.male || 0}</div>
                                        <div className="text-sm text-gray-600">Laki-laki</div>
                                    </div>
                                    <div className="bg-pink-100 p-3 rounded">
                                        <div className="text-lg font-medium">{guruGenderStats.female || 0}</div>
                                        <div className="text-sm text-gray-600">Perempuan</div>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded">
                                        <div className="text-lg font-medium">{guruGenderStats.total || 0}</div>
                                        <div className="text-sm text-gray-600">Total</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            );
        }
    
        // For kabupaten/kecamatan/sekolah levels in guru tab, show gender breakdown by school type
        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2" rowSpan="2">No</th>
                            <th className="border px-4 py-2" rowSpan="2">
                                {level === 'kabupaten' ? 'Kabupaten/Kota' : 
                                 level === 'kecamatan' ? 'Kecamatan' : 'Sekolah'}
                            </th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMA</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SMK</th>
                            <th className="border px-4 py-2 text-center" colSpan="3">SLB</th>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                            <th className="border px-4 py-2">L</th>
                            <th className="border px-4 py-2">P</th>
                            <th className="border px-4 py-2">Jml</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td 
                                    className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                    onClick={() => {
                                        if (level === 'kabupaten') handleKabupatenClick(item.wilayah);
                                        else if (level === 'kecamatan') handleKecamatanClick(item.wilayah);
                                        else if (level === 'sekolah') handleSchoolClick(item.id);
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.wilayah || item.nama}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{item.sma_l || 0}</td>
                                <td className="border px-4 py-2">{item.sma_p || 0}</td>
                                <td className="border px-4 py-2">{(Number(item.sma_l) || 0) + (Number(item.sma_p) || 0)}</td>
                                <td className="border px-4 py-2">{item.smk_l || 0}</td>
                                <td className="border px-4 py-2">{item.smk_p || 0}</td>
                                <td className="border px-4 py-2">{(Number(item.smk_l) || 0) + (Number(item.smk_p) || 0)}</td>
                                <td className="border px-4 py-2">{item.slb_l || 0}</td>
                                <td className="border px-4 py-2">{item.slb_p || 0}</td>
                                <td className="border px-4 py-2">{(Number(item.slb_l) || 0) + (Number(item.slb_p) || 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
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

        // if (activeTab === 'siswa') {
        //     return renderSiswaTable();
        // }

        // if (level === 'detail') {
        //     return renderSchoolDetails();
        // }

        // if (level === 'detail') {
        //     return renderGuruTable();
        // }

        if (activeTab === 'siswa') {
            return renderSiswaTable();
        } else if (activeTab === 'guru') {
            return renderGuruTable();
        } else if (level === 'detail') {
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

        // Level Kabupaten (tampilan default)
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
        let filename = 'data_pendidikan';
        
        if (activeTab === 'siswa') {
            if (level === 'detail' && selectedSchool) {
                exportData = siswaData;
                filename = `data_siswa_${selectedSchool}`;
            } else {
                exportData = data;
                filename = `data_siswa_${level}`;
            }
        } else {
            if (level === 'detail') {
                exportData = [schoolDetail];
                filename = `data_sekolah_${schoolDetail.id}`;
            } else {
                exportData = data;
                filename = `data_sekolah_${level}`;
            }
        }
        
        try {
            const worksheet = utils.json_to_sheet(exportData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Data');
            writeFile(workbook, `${filename}.xlsx`);
        } catch (err) {
            console.error('Error mengekspor excel:', err);
            alert('Gagal mengunduh data Excel. Silakan coba lagi.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-6 mt-20 mb-20">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                                    setSiswaDetail(null);
                                    setLevel('kabupaten');
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {/* Navigasi breadcrumb */}
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
                                    {level === 'detail' && activeTab === 'sekolah' && schoolDetail && (
                                        <span>Detail Sekolah: <b>{schoolDetail.nama}</b></span>
                                    )}
                                    {level === 'detail' && activeTab === 'siswa' && selectedSchool && (
                                        <span>Daftar Siswa Sekolah ID: <b>{selectedSchool}</b></span>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {renderTable()}

                        {!loading && ((data.length > 0) || (activeTab === 'siswa' && level === 'detail' && siswaData.length > 0)) && (
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
            <Footer />
        </div>
    );
};

export default DataPendidikan;