import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { User as UserIcon, Plus, Loader2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Guru = () => {
    const { admin } = usePage().props;
    const [guru, setGuru] = useState([]);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addData, setAddData] = useState({
        sekolah_id: '',
        laki_laki: 0,
        perempuan: 0
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchGuru();
        fetchSchools();
    }, []);

    const fetchGuru = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/guru');
            setGuru(response.data);
        } catch (error) {
            console.error('Error fetching guru:', error);
            setError('Gagal mengambil data guru. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSchools = async () => {
        try {
            const response = await axios.get('/api/sekolah');
            setSchools(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Gagal mengambil data sekolah.');
        }
    };

    const handleAddTeachers = async () => {
        if (!addData.sekolah_id) {
            setError('Silakan pilih sekolah terlebih dahulu.');
            return;
        }
        
        if (addData.laki_laki === 0 && addData.perempuan === 0) {
            setError('Silakan masukkan jumlah guru yang akan ditambahkan.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.post('/api/guru/batch-add', {
                sekolah_id: addData.sekolah_id,
                laki_laki: addData.laki_laki,
                perempuan: addData.perempuan
            });

            await fetchGuru();
            
            const totalAdded = addData.laki_laki + addData.perempuan;
            setSuccessMessage(`Berhasil menambahkan ${totalAdded} guru!`);
            setTimeout(() => setSuccessMessage(''), 5000);
            
            setAddData({
                sekolah_id: '',
                laki_laki: 0,
                perempuan: 0
            });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding teachers:', error);
            
            let errorMessage = 'Gagal menambahkan data guru.';
            if (error.response) {
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data.errors) {
                    errorMessage = Object.values(error.response.data.errors).join('\n');
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Ringkasan data per sekolah
    const schoolSummary = useMemo(() => {
        const summary = {};
        guru.forEach(teacher => {
            const schoolId = teacher.sekolah_id;
            const schoolName = teacher.sekolah?.nama || 'Unknown School';
            const gender = teacher.jenis_kelamin;
            
            if (!summary[schoolId]) {
                summary[schoolId] = {
                    id: schoolId,
                    name: schoolName,
                    bentukPendidikan: teacher.sekolah?.bp || '-',
                    laki_laki: 0,
                    perempuan: 0,
                    total: 0
                };
            }
            
            if (gender === 'Laki-laki') {
                summary[schoolId].laki_laki += 1;
            } else if (gender === 'Perempuan') {
                summary[schoolId].perempuan += 1;
            }
            
            summary[schoolId].total += 1;
        });
        
        return Object.values(summary);
    }, [guru]);

    // Kolom untuk tabel ringkasan
    const summaryColumns = useMemo(() => [
        { 
            accessorKey: 'name', 
            header: 'Sekolah', 
            size: 200,
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'bentukPendidikan', 
            header: 'Bentuk Pendidikan', 
            size: 150,
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'laki_laki', 
            header: 'Laki-laki', 
            size: 100,
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'perempuan', 
            header: 'Perempuan', 
            size: 100,
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'total', 
            header: 'Total Guru', 
            size: 100,
            enableColumnOrdering: false,
        },
    ], []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
                    <div className="font-semibold text-lg"></div>
                    <Link 
                        href={route('admin.profile')} 
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        <span className="text-base font-medium">{admin.name}</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    </Link>
                </nav>
                
                <div className="flex-1 p-6 overflow-auto">
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                            <div className="font-bold">Error!</div>
                            <div className="whitespace-pre-line">{error}</div>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                            <div className="font-bold">Sukses!</div>
                            <div>{successMessage}</div>
                        </div>
                    )}
                    
                    {/* Ringkasan Data */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Ringkasan Data Guru per Sekolah</h2>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                                disabled={loading}
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Guru
                            </button>
                        </div>
                        
                        <MaterialReactTable
                            columns={summaryColumns}
                            data={schoolSummary}
                            state={{ isLoading: loading }}
                            enableColumnActions={false}
                            enableColumnFilters={true}
                            enablePagination={true}
                            enableSorting={true}
                            enableBottomToolbar={true}
                            enableTopToolbar={true}
                            muiTablePaperProps={{
                                elevation: 0,
                                sx: {
                                    boxShadow: 'none',
                                    border: '1px solid #e5e7eb',
                                },
                            }}
                            muiTableBodyRowProps={({ row }) => ({
                                sx: {
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    },
                                },
                            })}
                        />
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">

                        <div className="border-b p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Tambah Data Guru
                            </h2>
                        </div>
                     
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Sekolah
                                </label>
                                <select
                                    value={addData.sekolah_id}
                                    onChange={(e) => setAddData({...addData, sekolah_id: e.target.value})}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                >
                                    <option value="">Pilih Sekolah</option>
                                    {schools.map(school => (
                                        <option key={school.id} value={school.id}>
                                            {school.nama} ({school.bp})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Jumlah Guru Laki-laki
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={addData.laki_laki}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 0;
                                            if (value >= 0) {
                                                setAddData({...addData, laki_laki: value});
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Jumlah Guru Perempuan
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={addData.perempuan}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 0;
                                            if (value >= 0) {
                                                setAddData({...addData, perempuan: value});
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t p-4 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setAddData({
                                        sekolah_id: '',
                                        laki_laki: 0,
                                        perempuan: 0
                                    });
                                    setError(null);
                                }}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAddTeachers}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                        Menyimpan...
                                    </>
                                ) : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Guru;