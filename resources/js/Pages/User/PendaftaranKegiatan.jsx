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

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
            await axios.post('/pendaftaran-kegiatan', formData);

            setShowSuccessPopup(true);

            setFormData({
                ...formData,
                jenisKelamin: '',
                tanggalLahir: '',
                alamat: '',
                nomorHP: '',
            });

        } catch (error) {
            console.error('Error:', error.response?.data);
            alert('Terjadi kesalahan saat mengirim pendaftaran');
        }
    };

    const inputClass =
        "w-full px-4 py-3 border border-[#dce6f0] rounded-xl focus:ring-2 focus:ring-[#223A5C]/20 focus:border-[#223A5C] outline-none text-[#1a2b3e] bg-[#f8fafc] placeholder:text-[#b0bec8] transition-all duration-200 hover:border-[#b8d0ea] hover:bg-white focus:bg-white text-sm";

    const labelClass = "block text-xs font-semibold text-[#223A5C] mb-1.5 tracking-wide";

    const sectionLabel = (text) => (
        <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#8fa5c0]">{text}</span>
            <div className="flex-1 h-px bg-[#e8eef5]" />
        </div>
    );

    return (
        <div 
            className="min-h-screen flex flex-col" 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f0f4f9' }}
        >

            {/* <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            /> */}

            <header className="w-full">
                <Navbar auth={auth} />
            </header>

            <div
                className="relative flex flex-col justify-center items-center py-14 px-6 mt-10 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #162d4a 0%, #223A5C 55%, #2e5080 100%)',
                    paddingBottom: '5rem',
                }}
            >
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-5 bg-white" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-5 bg-white" />

                <span
                    className="inline-block mb-3 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#a8c8f0', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                    Balai Teknologi Informasi & Data Pendidikan
                </span>
                <h1 className="text-white text-2xl md:text-3xl font-bold text-center leading-snug mb-2">
                    Form Pendaftaran Kegiatan
                </h1>
                <p className="text-white/50 text-sm text-center">
                    Lengkapi data diri Anda untuk mendaftar kegiatan
                </p>
            </div>

            <div className="px-4 pb-20 -mt-10 mb-10 relative z-10 ">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-[#e4ecf5] p-8 md:p-10">

                    <form onSubmit={handleSubmit}>

                        {/* Section 1 — Data Diri */}
                        {sectionLabel('Data Diri')}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <label className={labelClass}>Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="namaLengkap"
                                    value={formData.namaLengkap}
                                    // onChange={handleChange}
                                    // required
                                    readOnly
                                    // placeholder="Masukkan nama lengkap"
                                    className={inputClass}
                                />
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="md:col-span-2">
                                <label className={labelClass}>Jenis Kelamin</label>
                                <div className="flex gap-4">
                                    {['Laki-laki', 'Perempuan'].map((val) => (
                                        <label
                                            key={val}
                                            className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-sm font-medium select-none ${
                                                formData.jenisKelamin === val
                                                    ? 'border-[#223A5C] bg-[#eef4fb] text-[#223A5C]'
                                                    : 'border-[#dce6f0] bg-[#f8fafc] text-[#6a8aaa] hover:border-[#b8d0ea]'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="jenisKelamin"
                                                value={val}
                                                onChange={handleChange}
                                                checked={formData.jenisKelamin === val}
                                                className="hidden"
                                            />
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                formData.jenisKelamin === val
                                                    ? 'border-[#223A5C]'
                                                    : 'border-[#b8d0ea]'
                                            }`}>
                                                {formData.jenisKelamin === val && (
                                                    <div className="w-2 h-2 rounded-full bg-[#223A5C]" />
                                                )}
                                            </div>
                                            {val}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className={labelClass}>Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="tanggalLahir"
                                    value={formData.tanggalLahir}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            {/* Nomor HP */}
                            <div>
                                <label className={labelClass}>Nomor Handphone / WhatsApp</label>
                                <input
                                    type="tel"
                                    name="nomorHP"
                                    value={formData.nomorHP}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nomor handphone"
                                    className={inputClass}
                                />
                            </div>

                        </div>

                        {/* Divider */}
                        <div className="h-px bg-[#e8eef5] mb-6" />

                        {/* Section 2 — Kontak & Alamat */}
                        {sectionLabel('Kontak & Alamat')}

                        <div className="grid grid-cols-1 gap-5 mb-8">

                            {/* Email */}
                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    // onChange={handleChange}
                                    // required
                                    readOnly
                                    // placeholder="Masukkan email"
                                    className={inputClass}
                                />
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className={labelClass}>Alamat Lengkap</label>
                                <textarea
                                    name="alamat"
                                    rows="3"
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan alamat lengkap"
                                    className={inputClass + " resize-none"}
                                />
                            </div>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.99]"
                            style={{
                                background: 'linear-gradient(135deg, #223A5C, #2e5080)',
                                boxShadow: '0 4px 16px rgba(34,58,92,0.25)',
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            Kirim Pendaftaran
                        </button>

                    </form>
                </div>
            </div>

            {showSuccessPopup && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                    style={{ background: 'rgba(15,30,50,0.5)' }}
                >
                    <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-sm w-[90%] animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-green-600 mb-2">Pendaftaran Berhasil!</h2>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Pendaftaran kegiatan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.
                        </p>
                        <button
                            onClick={() => setShowSuccessPopup(false)}
                            className="text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                            style={{
                                background: 'linear-gradient(135deg, #223A5C, #2e5080)',
                                boxShadow: '0 4px 14px rgba(34,58,92,0.2)',
                            }}
                        >
                            OK, Mengerti
                        </button>
                    </div>
                </div>
            )}

            <Footer />

        </div>
    );
};

export default PendaftaranKegiatan;