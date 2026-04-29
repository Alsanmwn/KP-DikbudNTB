import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { Edit, Trash, User as UserIcon, Plus, School } from 'lucide-react';
import { Link } from '@inertiajs/react';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const Sekolah = () => {
    const { admin } = usePage().props;
    const [sekolahData, setSekolahData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editSekolah, setEditSekolah] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newSekolah, setNewSekolah] = useState({
        nama: '',
        npsn: '',
        bp: 'SMA',
        status: 'Negeri',
        alamat: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: 'Nusa Tenggara Barat',
        kode_pos: '',
        jumlah_guru: 0,
        jumlah_pegawai: 0,
        ruang_kelas: 0,
        ruang_lab: 0,
        ruang_perpus: 0
    });

    useEffect(() => {
        fetchSekolahData();
    }, []);

    const fetchSekolahData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/sekolah');
            setSekolahData(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Gagal mengambil data sekolah. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus sekolah ini?')) return;
        try {
            await axios.delete(`/api/sekolah/${id}`);
            setSekolahData(sekolahData.filter(sekolah => sekolah.id !== id));
        } catch (error) {
            console.error('Error deleting school:', error);
            setError('Gagal menghapus sekolah.');
        }
    };

    const handleEdit = (sekolah) => {
        setEditSekolah(sekolah);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/sekolah/${editSekolah.id}`, editSekolah);
            const updatedSekolahData = sekolahData.map(sekolah =>
                sekolah.id === editSekolah.id ? response.data : sekolah
            );
            setSekolahData(updatedSekolahData);
            setIsEditModalOpen(false);
            setEditSekolah(null);
        } catch (error) {
            console.error('Error updating school:', error);
            setError('Gagal memperbarui data sekolah.');
        }
    };

    const handleAddSekolah = async () => {
        try {
            const response = await axios.post('/api/sekolah', newSekolah);
            setSekolahData([...sekolahData, response.data]);
            setIsAddModalOpen(false);
            setNewSekolah({
                nama: '',
                npsn: '',
                bp: 'SMA',
                status: 'Negeri',
                alamat: '',
                kecamatan: '',
                kabupaten: '',
                provinsi: 'Nusa Tenggara Barat',
                kode_pos: '',
                jumlah_guru: 0,
                jumlah_pegawai: 0,
                ruang_kelas: 0,
                ruang_lab: 0,
                ruang_perpus: 0
            });
        } catch (error) {
            console.error('Error adding school:', error);
            setError('Gagal menambahkan sekolah baru.');
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'nama', header: 'Nama Sekolah', size: 280 },
        { accessorKey: 'npsn', header: 'NPSN', size: 150 },
        { accessorKey: 'bp', header: 'Bentuk Pendidikan', size: 180 },
        { accessorKey: 'status', header: 'Status', size: 150 },
        { accessorKey: 'status_kepemilikan', header: 'Status Kepemilikan', size: 180 },
        { accessorKey: 'sk_pendirian', header: 'Sk Pendirian', size: 170 },
        { accessorKey: 'tgl_sk_pendirian', header: 'Tanggal Sk Pendirian', size: 180 },
        { accessorKey: 'kepala_sekolah', header: 'Kepala Sekolah', size: 180 },
        { accessorKey: 'akreditasi', header: 'Akreditasi', size: 150 },
        { accessorKey: 'kurikulum', header: 'Kurikulum', size: 150 },
        { accessorKey: 'sk_izin_operasional', header: 'Sk Izin Operasional', size: 180 },
        { accessorKey: 'tgl_sk_izin', header: 'Tanggal Sk Izin', size: 180 },
        { accessorKey: 'alamat', header: 'Alamat', size: 250 },
        { accessorKey: 'kecamatan', header: 'Kecamatan', size: 180 },
        { accessorKey: 'kabupaten', header: 'Kabupaten', size: 180 },
        { accessorKey: 'provinsi', header: 'Provinsi', size: 150 },
        { accessorKey: 'kode_pos', header: 'Kode Pos', size: 150 },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(row.original.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 120,
        },
    ], []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
                    <div className="font-semibold text-lg"></div>
                    <Link href={route('admin.profile')} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="text-base font-medium">{admin.name}</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    </Link>
                </nav>
                <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                            {error}
                        </div>
                    )}
                   
                    {/* Card container with header and table inside */}
                    <div className="flex-1 overflow-hidden bg-white rounded-lg shadow">
                        {/* Header inside the white card */}
                        <div className="p-6 border-b flex justify-between items-center">
                            <h1 className="text-xl font-bold flex items-center">
                                Data Sekolah
                            </h1>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Sekolah
                            </button>
                        </div>
                        
                        {/* Table section */}
                        <div className="overflow-auto" style={{ height: 'calc(100vh - 250px)' }}>
                            <MaterialReactTable
                                columns={columns}
                                data={sekolahData}
                                state={{ isLoading: loading }}
                                enableStickyHeader
                                muiTableContainerProps={{
                                    sx: {
                                        maxHeight: '100%',
                                    },
                                }}
                                muiTablePaperProps={{
                                    sx: {
                                        boxShadow: 'none',
                                    },
                                }}
                                initialState={{
                                    density: 'comfortable',
                                }}
                                muiTableBodyCellProps={{
                                    sx: {
                                        padding: '12px 16px',
                                    },
                                }}
                                muiTableHeadCellProps={{
                                    sx: {
                                        padding: '12px 16px',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && editSekolah && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Edit Sekolah</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                                <input
                                    type="text"
                                    value={editSekolah?.nama || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, nama: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label>
                                <input
                                    type="text"
                                    value={editSekolah?.npsn || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, npsn: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bentuk Pendidikan</label>
                                <select
                                    value={editSekolah?.bp || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, bp: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                >
                                    <option value="SMA">SMA</option>
                                    <option value="SMK">SMK</option>
                                    <option value="SLB">SLB</option>
                                </select>
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={editSekolah?.status || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, status: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                >
                                    <option value="Negeri">Negeri</option>
                                    <option value="Swasta">Swasta</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten</label>
                                <input
                                    type="text"
                                    value={editSekolah?.kabupaten || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, kabupaten: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                                <input
                                    type="text"
                                    value={editSekolah?.kecamatan || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, kecamatan: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                                <input
                                    type="text"
                                    value={editSekolah?.provinsi || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, provinsi: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                                <input
                                    type="text"
                                    value={editSekolah?.kode_pos || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, kode_pos: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <textarea
                                    value={editSekolah?.alamat || ''}
                                    onChange={e => setEditSekolah({ ...editSekolah, alamat: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    rows={3}
                                ></textarea>
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Guru</label>
                                <input
                                    type="number"
                                    value={editSekolah?.jumlah_guru || 0}
                                    onChange={e => setEditSekolah({ ...editSekolah, jumlah_guru: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pegawai</label>
                                <input
                                    type="number"
                                    value={editSekolah?.jumlah_pegawai || 0}
                                    onChange={e => setEditSekolah({ ...editSekolah, jumlah_pegawai: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Kelas</label>
                                <input
                                    type="number"
                                    value={editSekolah?.ruang_kelas || 0}
                                    onChange={e => setEditSekolah({ ...editSekolah, ruang_kelas: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Lab</label>
                                <input
                                    type="number"
                                    value={editSekolah?.ruang_lab || 0}
                                    onChange={e => setEditSekolah({ ...editSekolah, ruang_lab: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Perpustakaan</label>
                                <input
                                    type="number"
                                    value={editSekolah?.ruang_perpus || 0}
                                    onChange={e => setEditSekolah({ ...editSekolah, ruang_perpus: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                       
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Tambah Sekolah Baru</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                                <input
                                    type="text"
                                    value={newSekolah.nama}
                                    onChange={e => setNewSekolah({ ...newSekolah, nama: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label>
                                <input
                                    type="text"
                                    value={newSekolah.npsn}
                                    onChange={e => setNewSekolah({ ...newSekolah, npsn: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bentuk Pendidikan</label>
                                <select
                                    value={newSekolah.bp}
                                    onChange={e => setNewSekolah({ ...newSekolah, bp: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                >
                                    <option value="SMA">SMA</option>
                                    <option value="SMK">SMK</option>
                                    <option value="SLB">SLB</option>
                                </select>
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={newSekolah.status}
                                    onChange={e => setNewSekolah({ ...newSekolah, status: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                >
                                    <option value="Negeri">Negeri</option>
                                    <option value="Swasta">Swasta</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten</label>
                                <input
                                    type="text"
                                    value={newSekolah.kabupaten}
                                    onChange={e => setNewSekolah({ ...newSekolah, kabupaten: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                                <input
                                    type="text"
                                    value={newSekolah.kecamatan}
                                    onChange={e => setNewSekolah({ ...newSekolah, kecamatan: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                                <input
                                    type="text"
                                    value={newSekolah.provinsi}
                                    onChange={e => setNewSekolah({ ...newSekolah, provinsi: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                                <input
                                    type="text"
                                    value={newSekolah.kode_pos}
                                    onChange={e => setNewSekolah({ ...newSekolah, kode_pos: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    required
                                />
                            </div>
                           
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <textarea
                                    value={newSekolah.alamat}
                                    onChange={e => setNewSekolah({ ...newSekolah, alamat: e.target.value })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                    rows={3}
                                    required
                                ></textarea>
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Guru</label>
                                <input
                                    type="number"
                                    value={newSekolah.jumlah_guru}
                                    onChange={e => setNewSekolah({ ...newSekolah, jumlah_guru: parseInt(e.target.value) || 0 })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pegawai</label>
                                <input
                                    type="number"
                                    value={newSekolah.jumlah_pegawai}
                                    onChange={e => setNewSekolah({ ...newSekolah, jumlah_pegawai: parseInt(e.target.value) || 0 })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Kelas</label>
                                <input
                                    type="number"
                                    value={newSekolah.ruang_kelas}
                                    onChange={e => setNewSekolah({ ...newSekolah, ruang_kelas: parseInt(e.target.value) || 0 })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Lab</label>
                                <input
                                    type="number"
                                    value={newSekolah.ruang_lab}
                                    onChange={e => setNewSekolah({ ...newSekolah, ruang_lab: parseInt(e.target.value) || 0 })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ruang Perpustakaan</label>
                                <input
                                    type="number"
                                    value={newSekolah.ruang_perpus}
                                    onChange={e => setNewSekolah({ ...newSekolah, ruang_perpus: parseInt(e.target.value) || 0 })}
                                    className="border p-2 w-full rounded"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                       
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleAddSekolah}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                disabled={loading || !newSekolah.nama || !newSekolah.npsn}
                            >
                                {loading ? 'Menambahkan...' : 'Tambah Sekolah'}
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
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

export default Sekolah;