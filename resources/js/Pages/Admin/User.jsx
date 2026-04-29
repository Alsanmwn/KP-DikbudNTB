import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage, Link } from '@inertiajs/react';
import { Edit, Trash, User as UserIcon } from 'lucide-react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const User = () => {
    const { admin } = usePage().props;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            setError('Gagal mengambil data pengguna. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/users/${id}`);
            if (response.status === 200) {
                setUsers(prev => prev.filter((user) => user.id !== id));
            }
        } catch (error) {
            setError('Gagal menghapus: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setIsModalOpen(true);
    };

    // const handleSaveEdit = async () => {
    //     setSaveLoading(true);
    //     setError(null);
    //     try {
    //         const response = await axios.put(`/api/users/${editUser.id}`, {
    //             name: editUser.name,
    //             email: editUser.email,
    //             role: editUser.role,
    //         });

    //         setUsers(prev =>
    //             prev.map((user) =>
    //                 user.id === editUser.id ? { ...user, ...response.data } : user
    //             )
    //         );
    //         setIsModalOpen(false);
    //         setEditUser(null);
    //     } catch (error) {
    //         setError(
    //             'Gagal memperbarui pengguna: ' +
    //             (error.response?.data?.message || error.message)
    //         );
    //     } finally {
    //         setSaveLoading(false);
    //     }
    // };
    const handleSaveEdit = async () => {
    setSaveLoading(true);
    setError(null);
    try {
        // Ganti PUT → POST dengan _method spoofing
        const response = await axios.post(`/api/users/${editUser.id}`, {
            _method: 'PUT',
            name: editUser.name,
            email: editUser.email,
            role: editUser.role,
        });

        setUsers(prev =>
            prev.map((user) =>
                user.id === editUser.id ? { ...user, ...response.data } : user
            )
        );
        setIsModalOpen(false);
        setEditUser(null);
    } catch (error) {
        setError(
            'Gagal memperbarui pengguna: ' +
            (error.response?.data?.message || error.message)
        );
    } finally {
        setSaveLoading(false);
    }
};

    const columns = useMemo(
        () => [
            { accessorKey: 'name', header: 'Nama', size: 200 },
            { accessorKey: 'email', header: 'Email', size: 200 },
            {
                accessorKey: 'role',
                header: 'Role',
                size: 120,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    const roleStyle = {
                        anggota: 'bg-green-100 text-green-600',
                        umum: 'bg-gray-100 text-gray-600',
                    };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${roleStyle[role] || 'bg-gray-100 text-gray-600'}`}>
                            {role}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'created_at',
                header: 'Tanggal Bergabung',
                Cell: ({ cell }) => {
                    const date = cell.getValue();
                    return date ? new Date(date).toLocaleDateString('id-ID') : '-';
                },
                size: 150,
            },
            {
                header: 'Aksi',
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setConfirmDelete(row.original.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash className="w-5 h-5" />
                        </button>
                    </div>
                ),
            },
        ],
        [users]
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 w-full">

                <nav className="bg-white shadow-lg p-3 sm:p-4 flex flex-row justify-between items-center">
                    <div></div>
                    <Link
                        href={route('admin.profile')}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 ml-auto"
                    >
                        <span className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
                            {admin.name}
                        </span>
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    </Link>
                </nav>

                <div className="p-3 sm:p-6">

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                                Data User
                            </h1>
                        </div>
                        <div className="p-2 sm:p-4 overflow-x-auto">
                            <MaterialReactTable
                                columns={columns}
                                data={users}
                                state={{ isLoading: loading }}
                                initialState={{ columnOrder: ['name', 'email', 'role', 'created_at', 'Aksi'] }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && editUser && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-3">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Edit Pengguna
                        </h2>

                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                            <input
                                type="text"
                                value={editUser.name}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <div className="flex gap-2">
                                {['anggota', 'umum'].map((r) => {
                                    const styleMap = {
                                        anggota: 'bg-green-100 text-green-600 border-green-300',
                                        umum: 'bg-gray-100 text-gray-600 border-gray-300',
                                    };
                                    const isSelected = editUser.role === r;
                                    return (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setEditUser({ ...editUser, role: r })}
                                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border capitalize transition-all
                                                ${styleMap[r]}
                                                ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400 scale-105' : 'opacity-50 hover:opacity-80'}
                                            `}
                                        >
                                            {r}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={saveLoading}
                                className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={saveLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                {saveLoading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-3">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
                        <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />
                        <h2 className="text-lg font-semibold text-red-600 mb-3">Konfirmasi Hapus</h2>
                        <p className="text-gray-600 mb-5 text-sm">
                            Apakah Anda yakin ingin menghapus data ini?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(confirmDelete);
                                    setConfirmDelete(null);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded"
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

export default User;