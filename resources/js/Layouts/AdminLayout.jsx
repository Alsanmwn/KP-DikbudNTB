import React from 'react';
import Sidebar from '@/Components/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-lg font-bold">Admin Dashboard</h1>
                </header>
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
