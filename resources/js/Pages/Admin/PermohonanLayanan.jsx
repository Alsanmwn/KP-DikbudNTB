import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { Edit, Trash, FileText } from 'lucide-react';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const PermohonanLayanan = () => {
    const { admin } = usePage().props;
    const [permohonanList, setPermohonanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editPermohonan, setEditPermohonan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchPermohonan();
    }, []);

    const fetchPermohonan = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/permohonan-layanan');
            setPermohonanList(response.data);
        } catch (error) {
            console.error('Error fetching permohonan:', error);
            setError('Gagal mengambil data permohonan. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus permohonan ini?')) return;
        try {
            await axios.delete(`/api/permohonan-layanan/${id}`);
            setPermohonanList(permohonanList.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting permohonan:', error);
            setError('Gagal menghapus permohonan.');
        }
    };

    const handleEdit = (permohonan) => {
        setEditPermohonan(permohonan);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/permohonan-layanan/${editPermohonan.id}`, editPermohonan);
            const updatedList = permohonanList.map(item => 
                item.id === editPermohonan.id ? response.data : item
            );
            setPermohonanList(updatedList);
            setIsModalOpen(false);
            setEditPermohonan(null);
        } catch (error) {
            console.error('Error updating permohonan:', error);
            setError('Gagal memperbarui permohonan.');
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'nama', header: 'Nama', size: 200, minSize: 200 },
        { accessorKey: 'email', header: 'Email', size: 250, minSize: 250 },
        { accessorKey: 'alamat_sekolah', header: 'Alamat Sekolah', size: 300, minSize: 300 },
        { accessorKey: 'nama_kegiatan', header: 'Nama Kegiatan', size: 250, minSize: 250 },
        { 
            accessorKey: 'keperluan',
            header: 'Keperluan',
            size: 200, 
            minSize: 200
        },
        { 
            accessorKey: 'custom_keperluan',  // Dipindahkan setelah keperluan
            header: 'Custom Keperluan',
            size: 300,
            minSize: 300
        },
        { accessorKey: 'kontak', header: 'Kontak', size: 200, minSize: 200 },
        {
            accessorKey: 'files',
            header: 'Files',
            Cell: ({ row }) => {
                const files = JSON.parse(row.original.files || '[]');
                return files.length ? (
                    <div className="flex gap-2">
                        {files.map((file, index) => (
                            <a 
                                key={index}
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <FileText className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                ) : '-';
            },
            size: 150,
            minSize: 150
        },
        {
            accessorKey: 'created_at',
            header: 'Tanggal Dibuat',
            Cell: ({ cell }) => {
                const date = cell.getValue();
                return date ? new Date(date).toLocaleDateString('id-ID') : '-';
            },
            size: 200,
            minSize: 200
        },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-3">
                    <button 
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => handleDelete(row.original.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 150,
            minSize: 150
        },
    ], []);    

    const formFields = [
        { name: 'nama', label: 'Nama', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'alamat_sekolah', label: 'Alamat Sekolah', type: 'text' },
        { name: 'nama_kegiatan', label: 'Nama Kegiatan', type: 'text' },
        { name: 'keperluan', label: 'Keperluan', type: 'text' },
        { name: 'custom_keperluan', label: 'Custom Keperluan', type: 'text' },
        { name: 'kontak', label: 'Kontak', type: 'text' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <nav className="bg-white shadow-sm p-4 flex-none">
                    Welcome, {admin.name}
                </nav>
                <div className="flex-1 overflow-hidden p-6">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                            {error}
                        </div>
                    )}
                    <div className="h-full overflow-auto bg-white rounded-lg shadow">
                        <MaterialReactTable 
                            columns={columns} 
                            data={permohonanList} 
                            state={{ isLoading: loading }}
                            initialState={{ density: 'comfortable' }}
                            enableColumnResizing
                            muiTableContainerProps={{
                                sx: { maxHeight: 'calc(100vh - 200px)' }
                            }}
                            muiTablePaperProps={{
                                sx: {
                                    '& .MuiTableCell-root': {
                                        padding: '16px',
                                    },
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && editPermohonan && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4">Edit Permohonan Layanan</h2>
                        {formFields.map((field) => (
                            <input 
                                key={field.name}
                                type={field.type}
                                value={editPermohonan[field.name] || ''}
                                onChange={e => setEditPermohonan({ 
                                    ...editPermohonan, 
                                    [field.name]: e.target.value 
                                })}
                                className="border p-2 w-full mb-2"
                                placeholder={field.label}
                                disabled={loading}
                            />
                        ))}
                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermohonanLayanan;