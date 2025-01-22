// resources/js/Pages/Admin/DataPendidikan.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';

const DataPendidikan = () => {
    const { admin } = usePage().props; // Mengambil data admin yang dikirim dari rute

    return (
        <div>
            <h1>Data Pendidikan</h1>
            <p>Welcome, {admin.name}!</p>
            {/* Konten halaman Data Pendidikan */}
        </div>
    );
};

export default DataPendidikan;
