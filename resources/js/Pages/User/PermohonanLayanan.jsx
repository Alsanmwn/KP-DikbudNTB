import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import axios from 'axios';

const PermohonanLayanan = ({ auth }) => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        alamatSekolah: '',
        namaKegiatan: '',
        keperluan: '',
        customKeperluan: '',
        kontak: '',
        files: [],
    });

    const [showCustomKeperluan, setShowCustomKeperluan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "keperluan") {
            setShowCustomKeperluan(value === "Konsultasi yang Lain");
            if (value !== "Konsultasi yang Lain") {
                setFormData((prev) => ({ ...prev, customKeperluan: '' }));
            }
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + formData.files.length > 3) {
            alert("Maksimal upload 3 file PDF");
            return;
        }
        setFormData({ ...formData, files: [...formData.files, ...selectedFiles] });
    };

    const handleDeleteFile = (index) => {
        const newFiles = formData.files.filter((_, i) => i !== index);
        setFormData({ ...formData, files: newFiles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            
            // Append text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'files') {
                    formDataToSend.append(key, formData[key]);
                }
            });
            
            // Append files
            formData.files.forEach(file => {
                formDataToSend.append('files[]', file);
            });

            const response = await axios.post('/api/permohonan-layanan', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });

            alert('Permohonan layanan berhasil dikirim!');
            
            // Reset form
            setFormData({
                nama: '',
                email: '',
                alamatSekolah: '',
                namaKegiatan: '',
                keperluan: '',
                customKeperluan: '',
                kontak: '',
                files: [],
            });
            setShowCustomKeperluan(false);
            
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat mengirim permohonan.');
            alert('Gagal mengirim permohonan. Silakan coba lagi.');
        } finally {
            setLoading(false);
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
        
            <section className="bg-white text-center pb-16 px-[50px]">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Permohonan Layanan Pendidikan</h3>
                <div className="bg-gray-100 p-6 rounded-[10px] shadow-md max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Nama</label>
                            <input 
                                type="text" 
                                name="nama" 
                                value={formData.nama} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Alamat/Sekolah</label>
                            <input 
                                type="text" 
                                name="alamatSekolah" 
                                value={formData.alamatSekolah} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Nama Kegiatan</label>
                            <input 
                                type="text" 
                                name="namaKegiatan" 
                                value={formData.namaKegiatan} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Keperluan</label>
                            <select 
                                name="keperluan" 
                                value={formData.keperluan} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                                <option value="">Pilih Keperluan</option>
                                <option value="Permintaan Data">Permintaan Data</option>
                                <option value="Permintaan Narasumber">Permintaan Narasumber</option>
                                <option value="Konsultasi yang Lain">Konsultasi yang Lain</option>
                            </select>
                        </div>

                        {/* Input tambahan jika "Konsultasi yang Lain" dipilih */}
                        {showCustomKeperluan && (
                            <div>
                                <label className="block text-left font-medium text-[#223A5C]">Jelaskan Konsultasi</label>
                                <input 
                                    type="text" 
                                    name="customKeperluan" 
                                    value={formData.customKeperluan} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Upload PDF (Maksimal 3)</label>
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                multiple 
                                onChange={handleFileChange} 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                            <div className="mt-2 space-y-2">
                                {formData.files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white p-2 border rounded-md shadow-sm">
                                        <span className="text-sm text-gray-700 truncate">📄 {file.name}</span>
                                        <button type="button" onClick={() => handleDeleteFile(index)} className="text-red-500 hover:underline text-sm">Hapus</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Kontak</label>
                            <input 
                                type="text" 
                                name="kontak" 
                                value={formData.kontak} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                            Kirim Permohonan
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PermohonanLayanan;
