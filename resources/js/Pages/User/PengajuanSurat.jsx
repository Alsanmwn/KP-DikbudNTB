import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const PengajuanSurat = ({ auth }) => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        alamatSekolah: '',
        namaKegiatan: '',
        keperluan: '',
        kontak: '',
        files: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Data terkirim:', formData);
        alert('Permohonan layanan pendidikan berhasil dikirim!');
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
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Keperluan</label>
                            <select 
                                name="keperluan" 
                                value={formData.keperluan} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="Permintaan Data">Permintaan Data</option>
                                <option value="Permintaan Narasumber">Permintaan Narasumber</option>
                                <option value="Konsultasi yang Lain">Konsultasi yang Lain</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-left font-medium text-[#223A5C]">Upload PDF (Maksimal 3)</label>
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                multiple 
                                onChange={handleFileChange} 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <div className="mt-2 space-y-2">
                                {formData.files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white p-2 border rounded-md shadow-sm">
                                        <span className="text-sm text-gray-700 truncate">📄 {file.name}</span>
                                        <div className="flex gap-2">
                                            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">Lihat</a>
                                            <button type="button" onClick={() => handleDeleteFile(index)} className="text-red-500 hover:underline text-sm">Hapus</button>
                                        </div>
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
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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

export default PengajuanSurat;
