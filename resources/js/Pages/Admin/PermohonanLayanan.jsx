import React from 'react';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';

const PermohonanLayanan = () => {
    const { admin } = usePage().props;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <nav className="bg-white shadow-sm p-4 flex-none">
                    Welcome, {admin.name}
                </nav>
            </div>
        </div>
    );
};

export default PermohonanLayanan;