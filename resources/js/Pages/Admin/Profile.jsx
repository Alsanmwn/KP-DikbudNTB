import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Sidebar from '@/Components/Sidebar';


const Profile = () => {
    const { admin } = usePage().props;
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
   
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: admin.name,
        email: admin.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });


    const submit = (e) => {
        e.preventDefault();
        patch('/admin/profile-update', {
            preserveScroll: true,
            onSuccess: () => {
                setData(data => ({
                    ...data,
                    current_password: '',
                    password: '',
                    password_confirmation: ''
                }));
            },
        });
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
           
            <div className="flex-1">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Ubah Profil</h1>
                            </div>
                        </div>
                    </div>
                </nav>


                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                {recentlySuccessful && (
                                    <div className="mb-4 text-sm text-green-600">
                                        Profil berhasil diperbarui.
                                    </div>
                                )}


                                <form onSubmit={submit} className="space-y-6">
                                    {/* Kolom Nama */}
                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Lengkap" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                            placeholder="Masukkan nama lengkap Anda"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>


                                    {/* Kolom Email */}
                                    <div>
                                        <InputLabel htmlFor="email" value="Alamat Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            autoComplete="email"
                                            placeholder="Masukkan alamat email Anda"
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>


                                    {/* Kolom Password Saat Ini */}
                                    <div>
                                        <InputLabel htmlFor="current_password" value="Password Saat Ini" />
                                        <div className="relative">
                                            <TextInput
                                                id="current_password"
                                                type={showCurrentPassword ? "text" : "password"}
                                                className="mt-1 block w-full"
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                placeholder="Masukkan password saat ini"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? "Sembunyikan" : "Tampilkan"}
                                            </button>
                                        </div>
                                        <InputError message={errors.current_password} className="mt-2" />
                                    </div>


                                    {/* Kolom Password Baru */}
                                    <div>
                                        <InputLabel htmlFor="password" value="Password Baru" />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={showNewPassword ? "text" : "password"}
                                                className="mt-1 block w-full"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Masukkan password baru"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? "Sembunyikan" : "Tampilkan"}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>


                                    {/* Kolom Konfirmasi Password Baru */}
                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password Baru" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Konfirmasi password baru Anda"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>


                                    {/* Tombol Submit */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            {processing ? 'Memperbarui...' : 'Perbarui Profil'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Profile;
