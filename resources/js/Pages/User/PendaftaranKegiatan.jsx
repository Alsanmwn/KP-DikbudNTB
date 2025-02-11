import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const PendaftaranKegiatan = ({ auth }) => {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamat: '',
        nomorHP: '',
        email: '',
    });

    // Mengisi formData dengan data pengguna yang login
    useEffect(() => {
        if (auth && auth.user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                namaLengkap: auth.user.name || '',
                email: auth.user.email || '',
            }));
        }
    }, [auth]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tambahkan logika untuk mengirim data form ke server atau API
        console.log(formData);
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="w-full">
                <Navbar auth={auth} />
            </header>

            {/* Hero Section */}
            <div className="relative flex justify-center items-center flex-1 mb-16">
                <img
                    src="/assets/landingpage.png"
                    alt="Deskripsi gambar"
                    className="w-full h-[390px] object-cover"
                />
            </div>

            {/* Form Pendaftaran */}
            <section className="bg-white text-center pb-16 mb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Form Pendaftaran Kegiatan</h3>
                <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nama Lengkap */}
                        <div>
                            <label htmlFor="namaLengkap" className="block text-left font-semibold text-[#223A5C]">Nama Lengkap</label>
                            <input
                                type="text"
                                id="namaLengkap"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div>
                            <label className="block text-left font-semibold text-[#223A5C]">Jenis Kelamin</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="jenisKelamin"
                                        value="Laki-laki"
                                        onChange={handleChange}
                                        checked={formData.jenisKelamin === 'Laki-laki'}
                                        className="mr-2"
                                    />
                                    Laki-laki
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="jenisKelamin"
                                        value="Perempuan"
                                        onChange={handleChange}
                                        checked={formData.jenisKelamin === 'Perempuan'}
                                        className="mr-2"
                                    />
                                    Perempuan
                                </label>
                            </div>
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label htmlFor="tanggalLahir" className="block text-left font-semibold text-[#223A5C]">Tempat Tanggal Lahir</label>
                            <input
                                type="date"
                                id="tanggalLahir"
                                name="tanggalLahir"
                                value={formData.tanggalLahir}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Alamat */}
                        <div>
                            <label htmlFor="alamat" className="block text-left font-semibold text-[#223A5C]">Alamat Lengkap</label>
                            <textarea
                                id="alamat"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Nomor HP/WhatsApp */}
                        <div>
                            <label htmlFor="nomorHP" className="block text-left font-semibold text-[#223A5C]">Nomor HP/WhatsApp</label>
                            <input
                                type="tel"
                                id="nomorHP"
                                name="nomorHP"
                                value={formData.nomorHP}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-left font-semibold text-[#223A5C]">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Tombol Kirim */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PendaftaranKegiatan;
