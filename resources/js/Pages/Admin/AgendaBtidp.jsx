import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { PlusCircle, Edit, Trash, Link } from 'lucide-react';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';

const AgendaBTIDP = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKegiatan, setCurrentKegiatan] = useState({
    nama: '',
    deskripsi: '',
    tanggal: '',
    waktu: '',
    lokasi: '',
    gambar: null,
    status: 'open for public',
    link_pendaftaran: '',
    link_kegiatan: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  // Fetch data
  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/kegiatan');
      setKegiatan(response.data);
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentKegiatan({ ...currentKegiatan, gambar: file });
    }
  };

  // Handle save kegiatan
  const handleSaveKegiatan = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan ini?");
    if (confirmed) {
      try {
        const formData = new FormData();
        
        if (currentKegiatan.id) {
          formData.append('_method', 'PUT');
        }

        if (currentKegiatan.gambar instanceof File) {
          formData.append('gambar', currentKegiatan.gambar);
        }

        Object.keys(currentKegiatan).forEach(key => {
          if (key !== 'gambar' && currentKegiatan[key] !== null) {
            formData.append(key, currentKegiatan[key]);
          }
        });

        if (currentKegiatan.id) {
          await axios.post(`/api/kegiatan/${currentKegiatan.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await axios.post('/api/kegiatan', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        fetchKegiatan();
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        console.error('Error saving kegiatan:', error);
        alert('Gagal menyimpan kegiatan: ' + error.response?.data?.message || error.message);
      }
    }
  };

  // Add this function inside the AgendaBTIDP component
  const handleDeleteKegiatan = async (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?");
    if (confirmed) {
      try {
        await axios.delete(`/api/kegiatan/${id}`);
        fetchKegiatan(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting kegiatan:', error);
        alert('Gagal menghapus kegiatan: ' + error.response?.data?.message || error.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentKegiatan({
      nama: '',
      deskripsi: '',
      tanggal: '',
      waktu: '',
      lokasi: '',
      gambar: null,
      status: 'open for public',
      link_pendaftaran: '',
      link_kegiatan: '',
    });
    setImagePreview('');
  };

  // Table columns
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
      accessorKey: 'link_pendaftaran',
      header: 'Link Pendaftaran',
      Cell: ({ cell }) => (
        cell.getValue() ? (
          <a
            href={cell.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <Link className="w-4 h-4 mr-1" />
            Link Pendaftaran
          </a>
        ) : 'Tidak ada link'
      ),
    },
    {
      accessorKey: 'link_kegiatan',
      header: 'Link Kegiatan',
      Cell: ({ cell }) => (
        cell.getValue() ? (
          <a
            href={cell.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <Link className="w-4 h-4 mr-1" />
            Link Kegiatan
          </a>
        ) : 'Tidak ada link'
      ),
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      Cell: ({ cell }) => (
        cell.getValue() ? 
          <img src={`/storage/${cell.getValue()}`} alt="Gambar Kegiatan" className="h-16 w-16 object-cover" /> 
          : 'Tidak ada gambar'
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => (
        <span>{cell.getValue() === 'open for public' ? 'Open for Public' : 'Open Anggota'}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCurrentKegiatan({
                ...row.original,
                gambar: null
              });
              setImagePreview(row.original.gambar ? `/storage/${row.original.gambar}` : '');
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteKegiatan(row.original.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 overflow-hidden">
        <div className="bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Agenda Kegiatan BTIDP</h2>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <PlusCircle className="mr-2" /> Tambah Kegiatan
            </button>
          </div>
          
          <div className="overflow-x-auto max-h-[70vh]">
            <MaterialReactTable
              columns={columns}
              data={kegiatan}
              enableRowActions={false}
              muiTableContainerProps={{ style: { zIndex: 1 } }}
              loading={loading}
            />
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-50">
              <h3 className="text-xl font-semibold mb-4">
                {currentKegiatan.id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block mb-2">Nama Kegiatan</label>
                  <input
                    type="text"
                    value={currentKegiatan.nama}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, nama: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-2">Tanggal</label>
                  <input
                    type="date"
                    value={currentKegiatan.tanggal}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, tanggal: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-2">Waktu</label>
                  <input
                    type="time"
                    value={currentKegiatan.waktu}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, waktu: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={currentKegiatan.lokasi}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, lokasi: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Link Pendaftaran</label>
                  <input
                    type="url"
                    value={currentKegiatan.link_pendaftaran}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, link_pendaftaran: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Link Kegiatan</label>
                  <input
                    type="url"
                    value={currentKegiatan.link_kegiatan}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, link_kegiatan: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Deskripsi</label>
                  <textarea
                    value={currentKegiatan.deskripsi}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, deskripsi: e.target.value })}
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded"
                  />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover" />}
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Status</label>
                  <select
                    value={currentKegiatan.status}
                    onChange={(e) => setCurrentKegiatan({ ...currentKegiatan, status: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="open for public">Open for Public</option>
                    <option value="open anggota">Open Anggota</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKegiatan}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaBTIDP;