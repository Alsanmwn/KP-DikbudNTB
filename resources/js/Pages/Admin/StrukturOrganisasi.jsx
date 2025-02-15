import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';

// Set up axios defaults
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const StrukturOrganisasi = () => {
    const { admin } = usePage().props;
    const [pegawai, setPegawai] = useState([]);
    const [jabatan, setJabatan] = useState([]);
    const [strukturOrganisasi, setStrukturOrganisasi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedData, setSelectedData] = useState(null);
    const [activeTab, setActiveTab] = useState('pegawai'); // 'pegawai', 'jabatan', or 'struktur'

    // Form data state
    const [formData, setFormData] = useState({
        nama: '',
        nip: '',
        tahun_aktif: new Date().getFullYear(),
        nama_jabatan: '',
        pegawai_id: '',
        jabatan_id: '',
        peran: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         const [pegawaiRes, jabatanRes, strukturRes] = await Promise.all([
    //             axios.get('/api/pegawai'),
    //             axios.get('/api/jabatan'),
    //             axios.get('/api/struktur-organisasi')
    //         ]);
    //         setPegawai(pegawaiRes.data);
    //         setJabatan(jabatanRes.data);
    //         setStrukturOrganisasi(strukturRes.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setError('Gagal mengambil data. Silakan coba lagi nanti.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchData = async () => {
        try {
            setLoading(true);
            console.log('Memulai fetch data...');
            
            // Coba fetch satu per satu untuk identifikasi masalah
            const pegawaiRes = await axios.get('/api/pegawai');
            console.log('Data Pegawai:', pegawaiRes.data);
            setPegawai(pegawaiRes.data);
    
            const jabatanRes = await axios.get('/api/jabatan');
            console.log('Data Jabatan:', jabatanRes.data);
            setJabatan(jabatanRes.data);
    
            const strukturRes = await axios.get('/api/struktur-organisasi');
            console.log('Data Struktur:', strukturRes.data);
            setStrukturOrganisasi(strukturRes.data);
    
        } catch (error) {
            console.error('Error lengkap:', error);
            console.error('Response error:', error.response);
            console.error('Request error:', error.request);
            console.error('Error config:', error.config);
            setError(`Gagal mengambil data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setModalMode('add');
        setSelectedData(null);
        setFormData({
            nama: '',
            nip: '',
            tahun_aktif: new Date().getFullYear(),
            nama_jabatan: '',
            pegawai_id: '',
            jabatan_id: '',
            peran: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (data) => {
        setModalMode('edit');
        setSelectedData(data);
        setFormData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        
        try {
            let endpoint;
            switch (activeTab) {
                case 'pegawai':
                    endpoint = `/api/pegawai/${id}`;
                    break;
                case 'jabatan':
                    endpoint = `/api/jabatan/${id}`;
                    break;
                case 'struktur':
                    endpoint = `/api/struktur-organisasi/${id}`;
                    break;
            }
            
            await axios.delete(endpoint);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Gagal menghapus data.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint;
            let method;
            let data;

            switch (activeTab) {
                case 'pegawai':
                    endpoint = modalMode === 'add' ? '/api/pegawai' : `/api/pegawai/${selectedData.id}`;
                    method = modalMode === 'add' ? 'post' : 'put';
                    data = {
                        nama: formData.nama,
                        nip: formData.nip,
                        tahun_aktif: formData.tahun_aktif
                    };
                    break;
                case 'jabatan':
                    endpoint = modalMode === 'add' ? '/api/jabatan' : `/api/jabatan/${selectedData.id}`;
                    method = modalMode === 'add' ? 'post' : 'put';
                    data = {
                        nama_jabatan: formData.nama_jabatan
                    };
                    break;
                case 'struktur':
                    endpoint = modalMode === 'add' ? '/api/struktur-organisasi' : `/api/struktur-organisasi/${selectedData.id}`;
                    method = modalMode === 'add' ? 'post' : 'put';
                    data = {
                        pegawai_id: formData.pegawai_id,
                        jabatan_id: formData.jabatan_id,
                        peran: formData.peran
                    };
                    break;
            }

            await axios[method](endpoint, data);
            fetchData();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Gagal menyimpan data.');
        }
    };

    const pegawaiColumns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', size: 50 },
        { accessorKey: 'nama', header: 'Nama', size: 200 },
        { accessorKey: 'nip', header: 'NIP', size: 150 },
        { accessorKey: 'tahun_aktif', header: 'Tahun Aktif', size: 100 },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleEdit(row.original)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(row.original.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            ),
            size: 150,
        },
    ], []);

    const jabatanColumns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', size: 50 },
        { accessorKey: 'nama_jabatan', header: 'Nama Jabatan', size: 200 },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleEdit(row.original)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(row.original.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            ),
            size: 150,
        },
    ], []);

    const strukturColumns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', size: 50 },
        { 
            accessorKey: 'pegawai_id', 
            header: 'Pegawai',
            Cell: ({ row }) => {
                const pegawaiData = pegawai.find(p => p.id === row.original.pegawai_id);
                return pegawaiData?.nama || '-';
            },
            size: 200 
        },
        { 
            accessorKey: 'jabatan_id', 
            header: 'Jabatan',
            Cell: ({ row }) => {
                const jabatanData = jabatan.find(j => j.id === row.original.jabatan_id);
                return jabatanData?.nama_jabatan || '-';
            },
            size: 200 
        },
        { accessorKey: 'peran', header: 'Peran', size: 150 },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleEdit(row.original)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(row.original.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            ),
            size: 150,
        },
    ], [pegawai, jabatan]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <nav className="bg-white shadow-sm p-4">Welcome, {admin.name}</nav>
                <div className="p-6">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => setActiveTab('pegawai')}
                                className={`px-4 py-2 rounded ${activeTab === 'pegawai' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Data Pegawai
                            </button>
                            <button
                                onClick={() => setActiveTab('jabatan')}
                                className={`px-4 py-2 rounded ${activeTab === 'jabatan' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Data Jabatan
                            </button>
                            <button
                                onClick={() => setActiveTab('struktur')}
                                className={`px-4 py-2 rounded ${activeTab === 'struktur' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Struktur Organisasi
                            </button>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
                        >
                            Tambah Data
                        </button>
                    </div>

                    <MaterialReactTable
                        columns={
                            activeTab === 'pegawai' ? pegawaiColumns :
                            activeTab === 'jabatan' ? jabatanColumns :
                            strukturColumns
                        }
                        data={
                            activeTab === 'pegawai' ? pegawai :
                            activeTab === 'jabatan' ? jabatan :
                            strukturOrganisasi
                        }
                        state={{ isLoading: loading }}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4">
                            {modalMode === 'add' ? 'Tambah' : 'Edit'} Data {
                                activeTab === 'pegawai' ? 'Pegawai' :
                                activeTab === 'jabatan' ? 'Jabatan' :
                                'Struktur Organisasi'
                            }
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            {activeTab === 'pegawai' && (
                                <>
                                    <input
                                        type="text"
                                        value={formData.nama}
                                        onChange={e => setFormData({ ...formData, nama: e.target.value })}
                                        className="border p-2 w-full mb-2"
                                        placeholder="Nama Pegawai"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formData.nip}
                                        onChange={e => setFormData({ ...formData, nip: e.target.value })}
                                        className="border p-2 w-full mb-2"
                                        placeholder="NIP"
                                    />
                                    <input
                                        type="number"
                                        value={formData.tahun_aktif}
                                        onChange={e => setFormData({ ...formData, tahun_aktif: e.target.value })}
                                        className="border p-2 w-full mb-4"
                                        placeholder="Tahun Aktif"
                                        required
                                    />
                                </>
                            )}

                            {activeTab === 'jabatan' && (
                                <input
                                    type="text"
                                    value={formData.nama_jabatan}
                                    onChange={e => setFormData({ ...formData, nama_jabatan: e.target.value })}
                                    className="border p-2 w-full mb-4"
                                    placeholder="Nama Jabatan"
                                    required
                                />
                            )}

                            {activeTab === 'struktur' && (
                                <>
                                    <select
                                        value={formData.pegawai_id}
                                        onChange={e => setFormData({ ...formData, pegawai_id: e.target.value })}
                                        className="border p-2 w-full mb-2"
                                        required
                                    >
                                        <option value="">Pilih Pegawai</option>
                                        {pegawai.map(p => (
                                            <option key={p.id} value={p.id}>{p.nama}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={formData.jabatan_id}
                                        onChange={e => setFormData({ ...formData, jabatan_id: e.target.value })}
                                        className="border p-2 w-full mb-2"
                                        required
                                    >
                                        <option value="">Pilih Jabatan</option>
                                        {jabatan.map(j => (
                                            <option key={j.id} value={j.id}>{j.nama_jabatan}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={formData.peran}
                                        onChange={e => setFormData({ ...formData, peran: e.target.value })}
                                        className="border p-2 w-full mb-4"
                                        placeholder="Peran"
                                    />
                                </>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    disabled={loading}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>    
    );
};

export default StrukturOrganisasi;