import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';


const Dashboard = () => {
    const { admin } = usePage().props;


    // Check authentication on component mount
    useEffect(() => {
        if (!admin) {
            router.visit('/admin/login');
        }
    }, [admin]);


    // Show loading or redirect if not authenticated
    if (!admin) {
        return null; // or return a loading spinner
    }


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />


            <div className="flex-1">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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
                                {/* Konten dashboard */}
                                <h2 className="text-lg font-semibold">Dashboard Content</h2>
                                <p>Email: {admin.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
