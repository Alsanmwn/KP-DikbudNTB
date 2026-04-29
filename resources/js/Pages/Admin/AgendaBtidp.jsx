import { usePage, Link } from '@inertiajs/react';
import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { PlusCircle, Edit, Trash, Users, Link as LinkIcon, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const AgendaBTIDP = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrantsModalOpen, setIsRegistrantsModalOpen] = useState(false);
  const [registrants, setRegistrants] = useState([]);
  const [selectedKegiatanId, setSelectedKegiatanId] = useState(null);
  const [currentKegiatan, setCurrentKegiatan] = useState({
    nama: '',
    deskripsi: '',
    tanggal: '',
    waktu: '',
    lokasi: '',
    gambar: null,
    status: 'open for public',
    tipe: 'public',
    link_kegiatan: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const { auth } = usePage().props;
  const adminName = auth?.user?.name || 'Admin';

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: '',
    id: null,
  });

  const fetchKegiatan = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/kegiatan');
      setKegiatan(response.data);
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
      alert('Gagal mengambil data kegiatan');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrants = async (kegiatanId) => {
    try {
      const response = await axios.get(`/api/kegiatan/${kegiatanId}/pendaftar`);
      const registrantsData = Array.isArray(response.data) ? response.data :
        Array.isArray(response.data.data) ? response.data.data : [];
      setRegistrants(registrantsData);
      setIsRegistrantsModalOpen(true);
      setSelectedKegiatanId(kegiatanId);
    } catch (error) {
      alert('Gagal mengambil data pendaftar: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentKegiatan({ ...currentKegiatan, gambar: file });
    }
  };

  const handleSaveKegiatan = () => {
    setConfirmModal({ show: true, type: 'save', id: null });
  };

  const handleDeleteKegiatan = (id) => {
    setConfirmModal({ show: true, type: 'delete', id });
  };

  const handleConfirmAction = async () => {
    try {
      if (confirmModal.type === 'save') {
        const formData = new FormData();
        Object.keys(currentKegiatan).forEach(key => {
          if (key === 'gambar') {
            if (currentKegiatan.gambar instanceof File) {
              formData.append('gambar', currentKegiatan.gambar);
            }
          } else if (currentKegiatan[key] !== null) {
            formData.append(key, currentKegiatan[key]);
          }
        });
        if (currentKegiatan.id) {
          formData.append('_method', 'PUT');
          await axios.post(`/api/kegiatan/${currentKegiatan.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          await axios.post('/api/kegiatan', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
        fetchKegiatan();
        setIsModalOpen(false);
        resetForm();
      }
      if (confirmModal.type === 'delete') {
        await axios.delete(`/api/kegiatan/${confirmModal.id}`);
        fetchKegiatan();
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    } finally {
      setConfirmModal({ show: false, type: '', id: null });
    }
  };

  const resetForm = () => {
    setCurrentKegiatan({
      nama: '',
      deskripsi: '',
      tanggal: '',
      waktu: '',
      lokasi: '',
      gambar: null,
      status: 'open for public',
      tipe: 'public',
      link_kegiatan: ''
    });
    setImagePreview('');
  };

  const columns = useMemo(() => [
    { accessorKey: 'nama', header: 'Nama Kegiatan' },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal',
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString('id-ID'),
    },
    {
      accessorKey: 'waktu',
      header: 'Waktu',
      Cell: ({ cell }) => cell.getValue().slice(0, 5),
    },
    { accessorKey: 'lokasi', header: 'Lokasi' },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      Cell: ({ cell }) => (
        <div className="truncate max-w-[200px]" title={cell.getValue()}>
          {cell.getValue() || 'Tidak ada deskripsi'}
        </div>
      ),
    },
    {
      accessorKey: 'link_kegiatan',
      header: 'Link Kegiatan',
      Cell: ({ cell }) => (
        cell.getValue() ?
          <a
            href={cell.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline flex items-center"
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            Link Kegiatan
          </a>
          : 'Tidak ada link'
      ),
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      Cell: ({ cell }) => (
        cell.getValue() ?
          <img src={`/storage/${cell.getValue()}`} alt="Gambar Kegiatan" className="h-16 w-16 object-cover rounded" />
          : 'Tidak ada gambar'
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => (
        <span>{cell.getValue() === 'open for public' ? 'Open for Public' : 'Open for Anggota'}</span>
      ),
    },
    {
      accessorKey: 'tipe',
      header: 'Tipe',
      Cell: ({ cell }) => (
        <span className={`px-2 py-1 rounded text-white text-xs ${cell.getValue() === 'public' ? 'bg-green-500' : 'bg-purple-500'}`}>
          {cell.getValue() === 'public' ? 'Public' : 'Anggota'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCurrentKegiatan({ ...row.original, gambar: null });
              setImagePreview(row.original.gambar ? `/storage/${row.original.gambar}` : '');
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => fetchRegistrants(row.original.id)}
            className="text-green-500 hover:text-green-700"
            title="Lihat Peserta"
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteKegiatan(row.original.id)}
            className="text-red-500 hover:text-red-700"
            title="Hapus"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ], []);

  const registrantsColumns = useMemo(() => [
    { accessorKey: 'namaLengkap', header: 'Nama', size: 200 },
    { accessorKey: 'email', header: 'Email', size: 200 },
    { accessorKey: 'nomorHP', header: 'No. HP', size: 150 },
    { accessorKey: 'jenisKelamin', header: 'Jenis Kelamin', size: 150 },
    {
      accessorKey: 'tanggalLahir',
      header: 'Tanggal Lahir',
      Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleDateString('id-ID') : '-',
      size: 150,
    },
    {
      accessorKey: 'alamat',
      header: 'Alamat',
      size: 300,
      Cell: ({ cell }) => <div className="whitespace-normal">{cell.getValue()}</div>,
    },
  ], []);

  const RegistrantsModal = () => {
    if (!isRegistrantsModalOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Daftar Pendaftar Kegiatan
            </h3>
          </div>
          {registrants.length === 0 ? (
            <p className="text-gray-600 mb-4">Belum ada pendaftar untuk kegiatan ini.</p>
          ) : (
            <div className="mb-4 overflow-x-auto">
              <MaterialReactTable
                columns={registrantsColumns}
                data={registrants}
                enableRowActions={false}
                enableColumnResizing
                enablePagination={true}
                enableTopToolbar={true}
                enableBottomToolbar={true}
                enableColumnFilters={true}
                enableGlobalFilter={true}
                enableSorting={true}
                muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
                initialState={{
                  density: 'compact',
                  pagination: { pageSize: 10, pageIndex: 0 },
                }}
                muiTableHeadCellProps={{
                  sx: { fontWeight: 'bold', backgroundColor: 'rgb(243, 244, 246)' },
                }}
              />
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsRegistrantsModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 h-screen">
        <nav className="bg-white shadow-lg px-4 sm:px-6 py-4 flex justify-between items-center flex-shrink-0 z-10">
          <div className="flex-1 sm:flex-none" />
          <Link
            href={route('admin.profile')}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors ml-auto"
          >
            <span className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
              {adminName}
            </span>
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
          </Link>
        </nav>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
          <div className="bg-white shadow-md rounded-lg flex flex-col h-full min-h-0">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b gap-3 sm:gap-0 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Agenda Kegiatan BTIDP</h2>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center bg-green-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-600 transition text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
              >
                <PlusCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Tambah Kegiatan
              </button>
            </div>

            <div className="overflow-x-auto flex-1 min-h-0">
              <MaterialReactTable
                columns={columns}
                data={kegiatan}
                enableRowActions={false}
                muiTableContainerProps={{
                  style: {
                    maxHeight: 'calc(100vh - 220px)',
                    minWidth: '600px',
                  }
                }}
                state={{ isLoading: loading }}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {currentKegiatan.id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Nama Kegiatan</label>
                  <input
                    type="text"
                    value={currentKegiatan.nama}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, nama: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-2 text-sm font-medium">Tanggal</label>
                  <input
                    type="date"
                    value={currentKegiatan.tanggal}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, tanggal: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-2 text-sm font-medium">Waktu</label>
                  <input
                    type="time"
                    value={currentKegiatan.waktu}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, waktu: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Lokasi</label>
                  <input
                    type="text"
                    value={currentKegiatan.lokasi}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, lokasi: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Deskripsi</label>
                  <textarea
                    value={currentKegiatan.deskripsi}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, deskripsi: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    rows="4"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Link Kegiatan</label>
                  <input
                    type="url"
                    value={currentKegiatan.link_kegiatan || ''}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, link_kegiatan: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="https://example.com/event"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded text-sm"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Status</label>
                  <select
                    value={currentKegiatan.status}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, status: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="open for public">Open for Public</option>
                    <option value="open for anggota">Open for Anggota</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Tipe Kegiatan</label>
                  <select
                    value={currentKegiatan.tipe}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, tipe: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="public">Public</option>
                    <option value="anggota">Anggota</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-500 text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveKegiatan}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        <RegistrantsModal />
      </div>

      {confirmModal.show && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fadeIn">
            <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {confirmModal.type === 'delete' ? 'Konfirmasi Hapus' : 'Simpan Perubahan?'}
            </h2>
            <p className="text-gray-600 mb-5">
              {confirmModal.type === 'delete'
                ? 'Apakah Anda yakin ingin menghapus data ini?'
                : 'Yakin ingin menyimpan perubahan ini?'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, type: '', id: null })}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white rounded text-sm ${
                  confirmModal.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {confirmModal.type === 'delete' ? 'Hapus' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaBTIDP;