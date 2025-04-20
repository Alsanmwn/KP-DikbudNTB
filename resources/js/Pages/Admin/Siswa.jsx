// import React from 'react';
// import Sidebar from '@/Components/Sidebar';
// import { usePage, router } from '@inertiajs/react';

// const Siswa = () => {
//     const { admin } = usePage().props;

//     const handleLogout = () => {
//         router.post('/admin/logout');
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Konten Halaman */}
//             <div className="flex-1">
//                 <nav className="bg-white shadow-sm">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="flex justify-between h-16">
//                             <div className="flex items-center">
//                                 <h1 className="text-xl font-semibold">Data Siswa</h1>
//                             </div>
//                             <div className="flex items-center">
//                                 <span className="mr-4">Welcome, {admin.name}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 <div className="py-12">
//                     <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                             <div className="p-6">
//                                 {/* Konten Agenda BTIDP */}
//                                 <h2 className="text-lg font-semibold">Data siswa ntb</h2>
//                                 <p>This is the data students page content.</p>

//                                 {/* Anda bisa menambahkan lebih banyak konten agenda di sini */}
//                                 <table className="min-w-full table-auto mt-6">
//                                     <thead>
//                                         <tr>
//                                             <th className="px-4 py-2">No</th>
//                                             <th className="px-4 py-2">name</th>
//                                             <th className="px-4 py-2">Tanggal lahir</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {/* Contoh data agenda */}
//                                         <tr>
//                                             <td className="px-4 py-2">1</td>
//                                             <td className="px-4 py-2">Alsa Nurmawan</td>
//                                             <td className="px-4 py-2">01/02/2020</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="px-4 py-2">2</td>
//                                             <td className="px-4 py-2">Ayu widya</td>
//                                             <td className="px-4 py-2">03/03/2020</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Siswa;

import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { Edit, Trash, User as UserIcon, Plus, Loader2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Konfigurasi Axios
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Siswa = () => {
    const { admin } = usePage().props;
    const [siswa, setSiswa] = useState([]);
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

    // Fetch data saat komponen mount
    useEffect(() => {
        fetchSiswa();
        fetchSchools();
    }, []);

    // Fungsi untuk mengambil data siswa
    const fetchSiswa = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/siswa');
            setSiswa(response.data);
        } catch (error) {
            console.error('Error fetching siswa:', error);
            setError('Gagal mengambil data siswa. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil data sekolah
    const fetchSchools = async () => {
        try {
            const response = await axios.get('/api/sekolah');
            setSchools(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Gagal mengambil data sekolah.');
        }
    };

    // Fungsi untuk menghapus siswa
    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) return;
        try {
            await axios.delete(`/api/siswa/${id}`);
            setSiswa(siswa.filter(s => s.id !== id));
            setSuccessMessage('Data siswa berhasil dihapus!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting siswa:', error);
            setError('Gagal menghapus data siswa.');
        }
    };

    // Fungsi untuk menambah siswa dalam jumlah banyak
    const handleAddStudents = async () => {
        if (!addData.sekolah_id) {
            setError('Silakan pilih sekolah terlebih dahulu.');
            return;
        }
        
        if (addData.laki_laki === 0 && addData.perempuan === 0) {
            setError('Silakan masukkan jumlah siswa yang akan ditambahkan.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.post('/api/siswa/batch-add', {
                sekolah_id: addData.sekolah_id,
                laki_laki: addData.laki_laki,
                perempuan: addData.perempuan
            });

            // Refresh data setelah penambahan
            await fetchSiswa();
            
            // Tampilkan pesan sukses
            const totalAdded = addData.laki_laki + addData.perempuan;
            setSuccessMessage(`Berhasil menambahkan ${totalAdded} siswa!`);
            setTimeout(() => setSuccessMessage(''), 5000);
            
            // Reset form dan tutup modal
            setAddData({
                sekolah_id: '',
                laki_laki: 0,
                perempuan: 0
            });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding students:', error);
            
            let errorMessage = 'Gagal menambahkan data siswa.';
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

    // Kolom untuk tabel detail siswa
    const columns = useMemo(() => [
        { 
            accessorKey: 'id', 
            header: 'ID', 
            size: 80,
            enableColumnOrdering: false,
            enableEditing: false,
        },
        { 
            accessorKey: 'sekolah.nama', 
            header: 'Sekolah',
            size: 200,
            Cell: ({ row }) => row.original.sekolah?.nama || '-',
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'sekolah.bp', 
            header: 'Bentuk Pendidikan',
            size: 150,
            Cell: ({ row }) => row.original.sekolah?.bp || '-',
            enableColumnOrdering: false,
        },
        { 
            accessorKey: 'jenis_kelamin', 
            header: 'Jenis Kelamin', 
            size: 120,
            enableColumnOrdering: false,
        },
        {
            accessorKey: 'created_at',
            header: 'Tanggal Dibuat',
            Cell: ({ cell }) => {
                const date = cell.getValue();
                return date ? new Date(date).toLocaleDateString('id-ID') : '-';
            },
            size: 150,
            enableColumnOrdering: false,
        },
        {
            id: 'actions',
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleDelete(row.original.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Hapus"
                        disabled={loading}
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 100,
            enableColumnOrdering: false,
        },
    ], [siswa, loading]);

    // Ringkasan data per sekolah
    const schoolSummary = useMemo(() => {
        const summary = {};
        siswa.forEach(student => {
            const schoolId = student.sekolah_id;
            const schoolName = student.sekolah?.nama || 'Unknown School';
            const gender = student.jenis_kelamin;
            
            if (!summary[schoolId]) {
                summary[schoolId] = {
                    id: schoolId,
                    name: schoolName,
                    bentukPendidikan: student.sekolah?.bp || '-',
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
    }, [siswa]);

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
            header: 'Total Siswa', 
            size: 100,
            enableColumnOrdering: false,
        },
    ], []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="font-semibold text-lg">Data Siswa</div>
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
                
                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Notifikasi */}
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
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Ringkasan Data Siswa per Sekolah</h2>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                                disabled={loading}
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Siswa
                            </button>
                        </div>
                        
                        <MaterialReactTable
                            columns={summaryColumns}
                            data={schoolSummary}
                            state={{ isLoading: loading }}
                            enableColumnActions={false}
                            enableColumnFilters={false}
                            enablePagination={true}
                            enableSorting={true}
                            enableBottomToolbar={true}
                            enableTopToolbar={false}
                            muiTablePaperProps={{
                                elevation: 0,
                                sx: {
                                    boxShadow: 'none',
                                    border: '1px solid #e5e7eb',
                                },
                            }}
                        />
                    </div>
                    
                    {/* Detail Data Siswa */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detail Data Siswa</h2>
                        
                        <MaterialReactTable
                            columns={columns}
                            data={siswa}
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

            {/* Modal Tambah Siswa */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        {/* Modal Header */}
                        <div className="border-b p-4">
                            <h2 className="text-lg font-semibold text-gray-800">Tambah Data Siswa</h2>
                        </div>
                        
                        {/* Modal Body */}
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
                                        Jumlah Siswa Laki-laki
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
                                        Jumlah Siswa Perempuan
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
                        
                        {/* Modal Footer */}
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
                                onClick={handleAddStudents}
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

export default Siswa;