import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';

// Set up axios defaults
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const User = () => {
    const { admin } = usePage().props;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            console.error('Error fetching users:', error);
            setError('Gagal mengambil data pengguna. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;
        try {
            const response = await axios.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Gagal menghapus pengguna.');
        }
    };
    

    const handleEdit = (user) => {
        setEditUser(user);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/users/${editUser.id}`, {
                name: editUser.name,
                email: editUser.email
            });
    
            const updatedUsers = users.map(user => 
                user.id === editUser.id ? response.data : user
            );
            setUsers(updatedUsers);
            setIsModalOpen(false);
            setEditUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Gagal memperbarui pengguna.');
        }
    };      

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'No', size: 50 },
        { accessorKey: 'name', header: 'Nama', size: 200 },
        { accessorKey: 'email', header: 'Email', size: 200 },
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
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(row.original.id)} 
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        Hapus
                    </button>
                </div>
            ),
            size: 150,
        },
    ], [users, loading]);

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
                    <MaterialReactTable 
                        columns={columns} 
                        data={users} 
                        state={{ isLoading: loading }}
                    />
                </div>
            </div>

            {isModalOpen && editUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4">Edit Pengguna</h2>
                        <input 
                            type="text" 
                            value={editUser?.name || ''} 
                            onChange={e => setEditUser({ ...editUser, name: e.target.value })} 
                            className="border p-2 w-full mb-2" 
                            placeholder="Nama"
                            disabled={loading}
                        />
                        <input 
                            type="email" 
                            value={editUser?.email || ''} 
                            onChange={e => setEditUser({ ...editUser, email: e.target.value })} 
                            className="border p-2 w-full mb-4" 
                            placeholder="Email"
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSaveEdit} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="px-4 py-2 bg-gray-500 text-white rounded ml-2 hover:bg-gray-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;