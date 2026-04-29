import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Edit, Trash, User as UserIcon } from 'lucide-react';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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
    const [modalMode, setModalMode] = useState('add');
    const [selectedData, setSelectedData] = useState(null);
    const [activeTab, setActiveTab] = useState('pegawai');
   
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [availableYears, setAvailableYears] = useState([]);

    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        id: null,
        tipe: null
    });

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

    useEffect(() => {
        if (pegawai.length > 0) {
            const years = [...new Set(pegawai.map(p => p.tahun_aktif))].sort((a, b) => b - a);
            setAvailableYears(years);
        }
    }, [pegawai]);

    const fetchData = async () => {
        try {
            setLoading(true);
           
            const [pegawaiRes, jabatanRes, strukturRes] = await Promise.all([
                axios.get('/api/pegawai'),
                axios.get('/api/jabatan'),
                axios.get('/api/pegawai-jabatan')
            ]);
           
            setPegawai(pegawaiRes.data);
            setJabatan(jabatanRes.data);
            setStrukturOrganisasi(strukturRes.data);
           
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
            setError(`Error: ${error.response?.data?.error || error.message}`);
           
            try {
                const pegawaiRes = await axios.get('/api/pegawai');
                setPegawai(pegawaiRes.data);
            } catch (pegawaiError) {
                console.error('Error fetching pegawai:', pegawaiError.response?.data);
            }
   
            try {
                const jabatanRes = await axios.get('/api/jabatan');
                setJabatan(jabatanRes.data);
            } catch (jabatanError) {
                console.error('Error fetching jabatan:', jabatanError.response?.data);
            }
   
            try {
                const strukturRes = await axios.get('/api/pegawai-jabatan');
                setStrukturOrganisasi(strukturRes.data);
            } catch (strukturError) {
                console.error('Error fetching struktur:', strukturError.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setModalMode('add');
        setSelectedData(null);
        if (activeTab === 'struktur') {
            setFormData({
                pegawai_id: '',
                jabatan_id: '',
                peran: ''
            });
        } else if (activeTab === 'pegawai') {
            setFormData({
                nama: '',
                nip: '',
                tahun_aktif: new Date().getFullYear()
            });
        } else if (activeTab === 'jabatan') {
            setFormData({
                nama_jabatan: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleEdit = (data) => {
        setModalMode('edit');
        setSelectedData(data);
       
        if (activeTab === 'struktur') {
            const struktur = { ...data };
           
            setFormData({
                ...struktur,
                pegawai_id: String(struktur.pegawai_id || ''),
                jabatan_id: String(struktur.jabatan_id || '')
            });
        } else {
            setFormData(data);
        }
       
        setIsModalOpen(true);
    };

    const handleDelete = (id, tipe) => {
        setDeleteConfirm({
            show: true,
            id,
            tipe
        });
    };

    const confirmDelete = async () => {
        try {
            let endpoint;
            switch (deleteConfirm.tipe) {
                case 'pegawai':
                    endpoint = `/api/pegawai/${deleteConfirm.id}`;
                    break;
                case 'jabatan':
                    endpoint = `/api/jabatan/${deleteConfirm.id}`;
                    break;
                case 'struktur':
                    endpoint = `/api/pegawai-jabatan/${deleteConfirm.id}`;
                    break;
                default:
                    throw new Error('Tipe yang ditentukan tidak valid');
            }

            await axios.delete(endpoint);
            fetchData();

        } catch (error) {
            console.error('Error menghapus data:', error);
            setError(`Gagal menghapus data: ${error.message}`);
        } finally {
            setDeleteConfirm({ show: false, id: null, tipe: null });
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
                    endpoint = modalMode === 'add' ? '/api/pegawai-jabatan' : `/api/pegawai-jabatan/${selectedData.id}`;
                    method = modalMode === 'add' ? 'post' : 'put';
                   
                    // Validasi data sebelum dikirim
                    if (!formData.pegawai_id || !formData.jabatan_id) {
                        setError('Pegawai dan Jabatan harus dipilih');
                        return; // Berhenti jika validasi gagal
                    }
                   
                    data = {
                        pegawai_id: parseInt(formData.pegawai_id, 10),
                        jabatan_id: parseInt(formData.jabatan_id, 10),
                        peran: formData.peran || ''
                    };
                    break;
            }

            await axios[method](endpoint, data);
            fetchData();
            setIsModalOpen(false);
           
            console.log(`Data berhasil ${modalMode === 'add' ? 'ditambahkan' : 'diperbarui'}`);
           
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Gagal menyimpan data. ' + (error.response?.data?.message || error.message));
        }
    };

    // Filter and search functions
    const getFilteredData = () => {
        let filteredData = [];
       
        switch (activeTab) {
            case 'pegawai':
                filteredData = pegawai;
               
                // Filter by year if selected
                if (filterYear) {
                    filteredData = filteredData.filter(p => p.tahun_aktif.toString() === filterYear);
                }
               
                // Filter by search term
                if (searchTerm) {
                    const term = searchTerm.toLowerCase();
                    filteredData = filteredData.filter(p =>
                        p.nama.toLowerCase().includes(term) ||
                        (p.nip && p.nip.toLowerCase().includes(term))
                    );
                }
                break;
               
            case 'jabatan':
                filteredData = jabatan;
               
                // Filter by search term
                if (searchTerm) {
                    const term = searchTerm.toLowerCase();
                    filteredData = filteredData.filter(j =>
                        j.nama_jabatan.toLowerCase().includes(term)
                    );
                }
                break;
               
            case 'struktur':
                filteredData = strukturOrganisasi;
               
                // Join with pegawai data for filtering by year
                if (filterYear) {
                    filteredData = filteredData.filter(s => {
                        const relatedPegawai = pegawai.find(p => p.id === s.pegawai_id);
                        return relatedPegawai && relatedPegawai.tahun_aktif.toString() === filterYear;
                    });
                }
               
                // Filter by search term
                if (searchTerm) {
                    const term = searchTerm.toLowerCase();
                    filteredData = filteredData.filter(s => {
                        const relatedPegawai = pegawai.find(p => p.id === s.pegawai_id);
                        const relatedJabatan = jabatan.find(j => j.id === s.jabatan_id);
                       
                        return (
                            (relatedPegawai && relatedPegawai.nama.toLowerCase().includes(term)) ||
                            (relatedJabatan && relatedJabatan.nama_jabatan.toLowerCase().includes(term)) ||
                            (s.peran && s.peran.toLowerCase().includes(term))
                        );
                    });
                }
                break;
        }
       
        return filteredData;
    };

    const pegawaiColumns = useMemo(() => [
        { accessorKey: 'nama', header: 'Nama', size: 200 },
        { accessorKey: 'nip', header: 'NIP', size: 150 },
        { accessorKey: 'tahun_aktif', header: 'Tahun Aktif', size: 100 },
        {
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id, 'pegawai')}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 100,
        },
    ], []);
   
    const jabatanColumns = useMemo(() => [
        { accessorKey: 'nama_jabatan', header: 'Nama Jabatan', size: 200 },
        {
            id: 'aksi',          
            enablePinning: true, 
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id, 'jabatan')}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 100,
        },
    ], []);
   
    const strukturColumns = useMemo(() => [
        {
            accessorKey: 'pegawai_id',
            header: 'Pegawai',
            Cell: ({ row }) => {
                const pegawaiData = pegawai.find(p => p.id === row.original.pegawai_id);
                return pegawaiData ? (
                    <div>
                        <div>{pegawaiData.nama}</div>
                        <div className="text-xs text-gray-500">NIP: {pegawaiData.nip || '-'}</div>
                        <div className="text-xs text-gray-500">Tahun: {pegawaiData.tahun_aktif}</div>
                    </div>
                ) : '-';
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
            id: 'aksi',          
            enablePinning: true, 
            header: 'Aksi',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id, 'struktur')}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
            size: 100,
        },
    ], [pegawai, jabatan]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
            <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
                <div className="font-semibold text-lg"></div>
                <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-base font-medium">{admin.name}</span>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                        <UserIcon className="w-5 h-5" />
                    </div>
                </div>
            </nav>
                <div className="p-6">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                            {error}
                            <button
                                onClick={() => setError(null)}
                                className="ml-2 text-red-800 font-bold"
                            >
                                ×
                            </button>
                        </div>
                    )}


                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-4">Struktur Organisasi</h1>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex flex-wrap gap-2">
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
                                Pegawai Jabatan
                            </button>
                            </div>
                        </div>


                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Tambah Data
                            </button>
                           
                            <div className="flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>

                            {(activeTab === 'pegawai' || activeTab === 'struktur') && availableYears.length > 0 && (
                                <div className="relative">
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className="p-2 pr-10 border border-gray-300 rounded w-full 
                                                appearance-none bg-white 
                                                [&::-ms-expand]:hidden"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {availableYears.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                        </div>
                    </div>

                    <MaterialReactTable
                        columns={
                            activeTab === 'pegawai' ? pegawaiColumns :
                            activeTab === 'jabatan' ? jabatanColumns :
                            strukturColumns
                        }
                        data={getFilteredData()}
                        state={{ isLoading: loading }}
                        enableColumnFilters
                        enablePagination
                        enableSorting
                        enableColumnPinning
                        initialState={{
                            pagination: {
                                pageSize: 10,
                                pageIndex: 0,
                            },
                        columnPinning: {
                                right: ['aksi'], 
                            },
                        }}
                        muiTablePaginationProps={{
                            rowsPerPageOptions: [10, 25, 50, 100],
                            labelRowsPerPage: 'Baris per halaman',
                            showFirstButton: true,
                            showLastButton: true,
                        }}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full animate-fadeIn">
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
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Nama Pegawai</label>
                                        <input
                                            type="text"
                                            value={formData.nama || ''}
                                            onChange={e => setFormData({ ...formData, nama: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Nama Pegawai"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">NIP</label>
                                        <input
                                            type="text"
                                            value={formData.nip || ''}
                                            onChange={e => setFormData({ ...formData, nip: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="NIP"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Tahun Aktif</label>
                                        <input
                                            type="number"
                                            value={formData.tahun_aktif || new Date().getFullYear()}
                                            onChange={e => setFormData({ ...formData, tahun_aktif: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Tahun Aktif"
                                            required
                                            min="2000"
                                            max="2100"
                                        />
                                    </div>
                                </>
                            )}


                            {activeTab === 'jabatan' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Jabatan</label>
                                    <input
                                        type="text"
                                        value={formData.nama_jabatan || ''}
                                        onChange={e => setFormData({ ...formData, nama_jabatan: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="Nama Jabatan"
                                        required
                                    />
                                </div>
                            )}

                            {activeTab === 'struktur' && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Pegawai</label>
                                        <select
                                            value={formData.pegawai_id || ''}
                                            onChange={e => setFormData({ ...formData, pegawai_id: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        >
                                            <option value="">Pilih Pegawai</option>
                                            {pegawai.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.nama} - {p.nip || 'No NIP'} ({p.tahun_aktif})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                        <select
                                            value={formData.jabatan_id || ''}
                                            onChange={e => setFormData({ ...formData, jabatan_id: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        >
                                            <option value="">Pilih Jabatan</option>
                                            {jabatan.map(j => (
                                                <option key={j.id} value={j.id}>{j.nama_jabatan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Peran</label>
                                        <input
                                            type="text"
                                            value={formData.peran || ''}
                                            onChange={e => setFormData({ ...formData, peran: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Peran"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
                                    disabled={loading}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteConfirm.show && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center animate-fadeIn">
                        
                        <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />

                        <h2 className="text-lg font-semibold text-red-600 mb-3">
                            Konfirmasi Hapus
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus data ini?
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setDeleteConfirm({ show: false, id: null, tipe: null })}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                                Batal
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>    
    );
};

export default StrukturOrganisasi;
