import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
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
    const [modalMode, setModalMode] = useState('add'); 
    const [selectedData, setSelectedData] = useState(null);
    const [activeTab, setActiveTab] = useState('pegawai'); 
    
    // Search and filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [availableYears, setAvailableYears] = useState([]);

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

    // Extract unique years from pegawai data for filtering
    useEffect(() => {
        if (pegawai.length > 0) {
            const years = [...new Set(pegawai.map(p => p.tahun_aktif))].sort((a, b) => b - a);
            setAvailableYears(years);
        }
    }, [pegawai]);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch all data from API endpoints
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
            
            // Try to fetch each data individually to identify the source of the error
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
        // Reset form data based on active tab
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
            // Make a copy of the struktur data
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

    const handleDelete = async (id, tipe) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        
        try {
            let endpoint;
            switch (tipe) {
                case 'pegawai':
                    endpoint = `/api/pegawai/${id}`;
                    break;
                case 'jabatan':
                    endpoint = `/api/jabatan/${id}`;
                    break;
                case 'struktur':
                    endpoint = `/api/pegawai-jabatan/${id}`;
                    break;
                default:
                    throw new Error('Tipe yang ditentukan tidak valid');
            }
            
            await axios.delete(endpoint);
            fetchData();
        } catch (error) {
            console.error('Error menghapus data:', error);
            setError(`Gagal menghapus data: ${error.message}`);
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
            
            // Show success message (you could add a toast notification here)
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
                <nav className="bg-white shadow-sm p-4">Welcome, {admin.name}</nav>
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
                            
                            {/* Search field */}
                            <div className="flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            
                            {/* Year filter - only for pegawai and struktur */}
                            {(activeTab === 'pegawai' || activeTab === 'struktur') && availableYears.length > 0 && (
                                <div>
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
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
                        initialState={{
                            pagination: {
                                pageSize: 10,
                                pageIndex: 0,
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
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
        </div>    
    );
};

export default StrukturOrganisasi;