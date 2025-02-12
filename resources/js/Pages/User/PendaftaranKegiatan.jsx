import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import axios from 'axios';

const PendaftaranKegiatan = ({ auth, kegiatan_data }) => {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamat: '',
        nomorHP: '',
        email: '',
        user_id: '',
        kegiatan_id: '',
    });

    useEffect(() => {
        if (auth?.user && kegiatan_data) {
            setFormData(prevState => ({
                ...prevState,
                namaLengkap: auth.user.name || '',
                email: auth.user.email || '',
                user_id: auth.user.id,
                kegiatan_id: kegiatan_data.id
            }));
        }
    }, [auth, kegiatan_data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim...';
    
            await axios.post('/api/pendaftaran-kegiatan', formData);
            
            alert('Pendaftaran berhasil dikirim!');
            
            setFormData({
                ...formData,
                jenisKelamin: '',
                tanggalLahir: '',
                alamat: '',
                nomorHP: '',
            });
            
        } catch (error) {
            alert(error.response?.data?.message || 'Terjadi kesalahan saat mengirim pendaftaran');
            console.error('Error:', error.response?.data);
        } finally {
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim';
        }
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col">
            <header className="w-full">
                <Navbar auth={auth} />
            </header>

            <div className="relative flex justify-center items-center flex-1 mb-16">
                <img
                    src="/assets/landingpage.png"
                    alt="Deskripsi gambar"
                    className="w-full h-[390px] object-cover"
                />
            </div>

            <section className="bg-white text-center pb-16 mb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-6">Form Pendaftaran Kegiatan</h3>
                <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="namaLengkap" className="block text-left font-semibold text-[#223A5C]">Nama Lengkap</label>
                            <input
                                type="text"
                                id="namaLengkap"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-left font-semibold text-[#223A5C]">Jenis Kelamin</label>
                            <div className="flex space-x-4 text-black">
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

                        <div>
                            <label htmlFor="tanggalLahir" className="block text-left font-semibold text-[#223A5C]">Tempat Tanggal Lahir</label>
                            <input
                                type="date"
                                id="tanggalLahir"
                                name="tanggalLahir"
                                value={formData.tanggalLahir}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="alamat" className="block text-left font-semibold text-[#223A5C]">Alamat Lengkap</label>
                            <textarea
                                id="alamat"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
                                rows="3"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="nomorHP" className="block text-left font-semibold text-[#223A5C]">Nomor HP/WhatsApp</label>
                            <input
                                type="tel"
                                id="nomorHP"
                                name="nomorHP"
                                value={formData.nomorHP}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-left font-semibold text-[#223A5C]">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
                                required
                            />
                        </div>

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

            <Footer />
        </div>
    );
};

export default PendaftaranKegiatan;
