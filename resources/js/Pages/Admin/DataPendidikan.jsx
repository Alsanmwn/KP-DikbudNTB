import React from 'react';
import Sidebar from '@/Components/Sidebar'; // Pastikan Sidebar sudah ada
import { usePage, router } from '@inertiajs/react';
import { useTable } from 'react-table'; // Import react-table

const DataPendidikan = () => {
    const { admin } = usePage().props; // Mendapatkan data admin

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    // Data siswa
    const students = [
        { id: 1, name: 'John Doe', dob: '2000-01-01', address: 'Jalan Raya No.1', gender: 'Male' },
        { id: 2, name: 'Jane Smith', dob: '2001-02-02', address: 'Jalan Raya No.2', gender: 'Female' },
        { id: 3, name: 'Alice Johnson', dob: '2002-03-03', address: 'Jalan Raya No.3', gender: 'Female' },
        { id: 4, name: 'Bob Brown', dob: '2000-04-04', address: 'Jalan Raya No.4', gender: 'Male' },
    ];

    // Definisi kolom untuk react-table
    const columns = React.useMemo(
        () => [
            { Header: 'No', accessor: 'id' },
            { Header: 'Nama', accessor: 'name' },
            { Header: 'Tanggal Lahir', accessor: 'dob' },
            { Header: 'Alamat', accessor: 'address' },
            { Header: 'Jenis Kelamin', accessor: 'gender' },
        ],
        []
    );

    // Menggunakan react-table hook
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: students,
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Konten Halaman */}
            <div className="flex-1">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Data Pendidikan</h1>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4">Welcome, {admin.name}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                {/* Konten Data Pendidikan */}
                                <h2 className="text-lg font-semibold">Data Siswa</h2>
                                
                                {/* Tabel Data Siswa dengan react-table */}
                                <table className="min-w-full table-auto mt-6" {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th
                                                        className="px-4 py-2"
                                                        {...column.getHeaderProps()}
                                                    >
                                                        {column.render('Header')}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => {
                                                        return (
                                                            <td className="px-4 py-2" {...cell.getCellProps()}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPendidikan;
