import React from 'react';
import Sidebar from '@/Components/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            
            <Sidebar />

            <div className="lg:ml-64 transition-all duration-300">
                
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-lg font-bold">Admin Dashboard</h1>
                </header>

                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;
