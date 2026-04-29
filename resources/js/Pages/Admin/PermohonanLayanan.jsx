import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { Edit, Trash, FileText, User as UserIcon, Shield } from 'lucide-react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Konfigurasi badge status
const STATUS_CONFIG = {
    menunggu:  { label: 'Menunggu',  color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    diproses:  { label: 'Diproses',  color: 'bg-blue-100 text-blue-700 border-blue-300'       },
    disetujui: { label: 'Disetujui', color: 'bg-purple-100 text-purple-700 border-purple-300'    },
    ditolak:   { label: 'Ditolak',   color: 'bg-red-100 text-red-700 border-red-300'          },
    selesai:   { label: 'Selesai',   color: 'bg-green-100 text-green-600 border-green-300'       },
};

const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.menunggu;
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
            {cfg.label}
        </span>
    );
};

const PermohonanLayanan = () => {
    const { admin } = usePage().props;
    const [permohonanList, setPermohonanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal edit data
    const [editPermohonan, setEditPermohonan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal ubah status
    const [statusModal, setStatusModal] = useState({ show: false, item: null });
    const [statusForm, setStatusForm] = useState({ status: 'menunggu', catatan_admin: '' });
    const [statusLoading, setStatusLoading] = useState(false);

    // Konfirmasi hapus
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

    useEffect(() => { fetchPermohonan(); }, []);

    const fetchPermohonan = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/permohonan-layanan');
            setPermohonanList(response.data);
        } catch {
            setError('Gagal mengambil data permohonan. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    /* ── Edit data ── */
    const handleEdit = (permohonan) => {
        setEditPermohonan(permohonan);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/permohonan-layanan/${editPermohonan.id}`, editPermohonan);
            setPermohonanList(prev => prev.map(item => item.id === editPermohonan.id ? response.data : item));
            setIsModalOpen(false);
            setEditPermohonan(null);
        } catch {
            setError('Gagal memperbarui permohonan.');
        }
    };

    /* ── Ubah status ── */
    const openStatusModal = (item) => {
        setStatusModal({ show: true, item });
        setStatusForm({
            status: item.status || 'menunggu',
            catatan_admin: item.catatan_admin || '',
        });
    };

    const handleSaveStatus = async () => {
        setStatusLoading(true);
        try {
            const response = await axios.put(
                `/api/permohonan-layanan/${statusModal.item.id}/status`,
                statusForm
            );
            setPermohonanList(prev =>
                prev.map(item => item.id === statusModal.item.id ? response.data : item)
            );
            setStatusModal({ show: false, item: null });
        } catch {
            setError('Gagal memperbarui status.');
        } finally {
            setStatusLoading(false);
        }
    };

    /* ── Hapus ── */
    const handleDelete = (id) => setDeleteConfirm({ show: true, id });

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/permohonan-layanan/${deleteConfirm.id}`);
            setPermohonanList(prev => prev.filter(item => item.id !== deleteConfirm.id));
        } catch {
            setError('Gagal menghapus permohonan.');
        } finally {
            setDeleteConfirm({ show: false, id: null });
        }
    };

    /* ── Kolom tabel ── */
    const columns = useMemo(() => [
        { accessorKey: 'nama',            header: 'Nama',            size: 200 },
        { accessorKey: 'email',           header: 'Email',           size: 250 },
        { accessorKey: 'alamat_sekolah',  header: 'Alamat Sekolah',  size: 300 },
        { accessorKey: 'nama_kegiatan',   header: 'Nama Kegiatan',   size: 250 },
        { accessorKey: 'keperluan',       header: 'Keperluan',       size: 200 },
        { accessorKey: 'custom_keperluan',header: 'Custom Keperluan',size: 300 },
        { accessorKey: 'kontak',          header: 'Kontak',          size: 200 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 160,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue()} />,
            filterVariant: 'select',
            filterSelectOptions: Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({ value, label })),
        },
        {
            accessorKey: 'catatan_admin',
            header: 'Catatan Admin',
            size: 250,
            Cell: ({ cell }) => cell.getValue() || <span className="text-gray-400 italic">-</span>,
        },
        {
            accessorKey: 'files',
            header: 'Files',
            size: 150,
            Cell: ({ row }) => {
                try {
                    const files = JSON.parse(row.original.files || '[]');
                    return files.length ? (
                        <div className="flex gap-2">
                            {files.map((file, index) => {
                                const fullUrl = file.startsWith('http') ? file : `/storage/${file}`;
                                return (
                                    <a key={index} href={fullUrl}
                                        onClick={(e) => {
                                            if (file.toLowerCase().endsWith('.pdf')) {
                                                e.preventDefault();
                                                window.open(fullUrl, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                                    >
                                        <FileText className="w-5 h-5" />
                                        {file.toLowerCase().endsWith('.pdf') && <span className="text-xs">PDF</span>}
                                    </a>
                                );
                            })}
                        </div>
                    ) : '-';
                } catch {
                    return <div className="text-red-500">Gagal memuat file</div>;
                }
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Tanggal Dibuat',
            size: 160,
            Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleDateString('id-ID') : '-',
        },
        {
            header: 'Aksi',
            size: 130,
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* Ubah Status */}
                    <button onClick={() => openStatusModal(row.original)}
                        className="text-green-500 hover:text-green-700" title="Ubah Status">
                        <Shield className="w-5 h-5" />
                    </button>
                    {/* Edit */}
                    <button onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700" title="Edit">
                        <Edit className="w-5 h-5" />
                    </button>
                    {/* Hapus */}
                    <button onClick={() => handleDelete(row.original.id)}
                        className="text-red-500 hover:text-red-700" title="Hapus">
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
        },
    ], []);

    const formFields = [
        { name: 'nama',             label: 'Nama',             type: 'text'  },
        { name: 'email',            label: 'Email',            type: 'email' },
        { name: 'alamat_sekolah',   label: 'Alamat Sekolah',   type: 'text'  },
        { name: 'nama_kegiatan',    label: 'Nama Kegiatan',    type: 'text'  },
        { name: 'keperluan',        label: 'Keperluan',        type: 'text'  },
        { name: 'custom_keperluan', label: 'Custom Keperluan', type: 'text'  },
        { name: 'kontak',           label: 'Kontak',           type: 'text'  },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
                    <div className="font-semibold text-lg" />
                    <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-base font-medium">{admin.name}</span>
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    </div>
                </nav>

                <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex-1 overflow-hidden bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h1 className="text-xl font-bold">Permohonan Layanan</h1>
                        </div>
                        <div className="overflow-auto" style={{ height: 'calc(100vh - 250px)' }}>
                            <MaterialReactTable
                                columns={columns}
                                data={permohonanList}
                                state={{ isLoading: loading }}
                                initialState={{ density: 'comfortable' }}
                                enableColumnResizing
                                enableStickyHeader
                                muiTableContainerProps={{ sx: { maxHeight: '100%' } }}
                                muiTablePaperProps={{
                                    sx: {
                                        boxShadow: 'none',
                                        '& .MuiTableCell-root': { padding: '16px' },
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Modal Ubah Status ── */}
            {statusModal.show && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full animate-fadeIn">
                        <h2 className="text-lg font-semibold mb-1">Ubah Status Permohonan</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Pemohon: <span className="font-medium text-gray-700">{statusModal.item?.nama}</span>
                        </p>

                        {/* Pilihan status sebagai pill button */}
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(STATUS_CONFIG).map(([value, { label, color }]) => (
                                <button
                                    key={value}
                                    onClick={() => setStatusForm(f => ({ ...f, status: value }))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
                                        ${statusForm.status === value
                                            ? `${color} ring-2 ring-offset-1 ring-current`
                                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Catatan admin */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan Admin <span className="text-gray-400">(opsional)</span>
                        </label>
                        <textarea
                            rows={3}
                            value={statusForm.catatan_admin}
                            onChange={e => setStatusForm(f => ({ ...f, catatan_admin: e.target.value }))}
                            className="border p-2 w-full rounded resize-none text-sm"
                            placeholder="Tuliskan catatan atau alasan perubahan status..."
                        />

                        <div className="flex justify-end gap-2 mt-5">
                            <button
                                onClick={() => setStatusModal({ show: false, item: null })}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
                                disabled={statusLoading}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSaveStatus}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                disabled={statusLoading}
                            >
                                {statusLoading ? 'Menyimpan...' : 'Simpan Status'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal Edit Data ── */}
            {isModalOpen && editPermohonan && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto animate-fadeIn">
                        <h2 className="text-lg font-semibold mb-4">Edit Permohonan Layanan</h2>
                        {formFields.map((field) => (
                            <div key={field.name} className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    value={editPermohonan[field.name] || ''}
                                    onChange={e => setEditPermohonan({ ...editPermohonan, [field.name]: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    placeholder={field.label}
                                    disabled={loading}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600" disabled={loading}>
                                Batal
                            </button>
                            <button onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50" disabled={loading}>
                                {loading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal Konfirmasi Hapus ── */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fadeIn">
                        <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />
                        <h2 className="text-lg font-semibold text-red-600 mb-3">Konfirmasi Hapus</h2>
                        <p className="text-gray-600 mb-5">Apakah Anda yakin ingin menghapus data ini?</p>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setDeleteConfirm({ show: false, id: null })}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600">
                                Batal
                            </button>
                            <button onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermohonanLayanan;