import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const PermohonanLayanan = ({ auth }) => {

    // ─── LOGIN GATE ───────────────────────────────────────────────────────────
    if (!auth?.user) {
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

                {/* Hero */}
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
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#a8c8f0',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        Balai Teknologi Informasi & Data Pendidikan
                    </span>
                    <h1 className="text-white text-2xl md:text-3xl font-bold text-center leading-snug mb-2">
                        Permohonan Layanan Pendidikan
                    </h1>
                    <p className="text-white/50 text-sm text-center">
                        Isi formulir berikut untuk mengajukan permohonan layanan
                    </p>
                </div>

                {/* Login Gate Card */}
                <div className="px-4 pb-20 -mt-10 relative z-10 mb-10">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-[#e4ecf5] p-10 text-center">

                        {/* Icon */}
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                            style={{ background: '#eef4fb' }}
                        >
                            <svg
                                className="w-8 h-8"
                                style={{ color: '#223A5C' }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        <h2
                            className="text-lg font-bold mb-2"
                            style={{ color: '#223A5C' }}
                        >
                            Login Diperlukan
                        </h2>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Anda harus <span className="font-semibold text-[#223A5C]">login</span> terlebih
                            dahulu untuk mengajukan permohonan layanan pendidikan. Silakan masuk atau daftarkan
                            akun Anda.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="/login"
                                className="text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 text-center"
                                style={{
                                    background: 'linear-gradient(135deg, #223A5C, #2e5080)',
                                    boxShadow: '0 4px 14px rgba(34,58,92,0.2)',
                                }}
                            >
                                Login Sekarang
                            </a>
                            <a
                                href="/register"
                                className="px-8 py-2.5 rounded-xl text-sm font-bold border text-center transition-colors hover:bg-[#f0f4f9]"
                                style={{ color: '#223A5C', borderColor: '#c8d8ea' }}
                            >
                                Daftar Akun
                            </a>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
    // ─── END LOGIN GATE ───────────────────────────────────────────────────────


    // ─── STATE ────────────────────────────────────────────────────────────────
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

    useEffect(() => {
        if (auth?.user) {
            setFormData((prev) => ({
                ...prev,
                nama: auth.user.name || '',
                email: auth.user.email || '',
            }));
        }
    }, [auth]);

    const [showCustomKeperluan, setShowCustomKeperluan] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // ─────────────────────────────────────────────────────────────────────────


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'keperluan') {
            setShowCustomKeperluan(value === 'Konsultasi yang Lain');
            if (value !== 'Konsultasi yang Lain') {
                setFormData((prev) => ({ ...prev, customKeperluan: '' }));
            }
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + formData.files.length > 3) {
            alert('Maksimal upload 3 file PDF');
            return;
        }
        setFormData({ ...formData, files: [...formData.files, ...selectedFiles] });
    };

    const handleDeleteFile = (index) => {
        const newFiles = formData.files.filter((_, i) => i !== index);
        setFormData({ ...formData, files: newFiles });
    };

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const formDataToSend = new FormData();
        formDataToSend.append('nama', formData.nama);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('alamatSekolah', formData.alamatSekolah);
        formDataToSend.append('namaKegiatan', formData.namaKegiatan);
        formDataToSend.append('keperluan', formData.keperluan);
        formDataToSend.append('customKeperluan', formData.customKeperluan);
        formDataToSend.append('kontak', formData.kontak);

        formData.files.forEach((file) => {
            formDataToSend.append('files[]', file);
        });

        try {
            const response = await fetch('/api/permohonan-layanan', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: formDataToSend,
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccessPopup(true);
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
            } else {
                const msg = result.message || 'Gagal mengirim permohonan';
                const errors = result.errors
                    ? Object.values(result.errors).flat().join('\n')
                    : '';
                setErrorMessage(errors || msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        'w-full px-4 py-3 border border-[#dce6f0] rounded-xl focus:ring-2 focus:ring-[#223A5C]/20 focus:border-[#223A5C] outline-none text-[#1a2b3e] bg-[#f8fafc] placeholder:text-[#b0bec8] transition-all duration-200 hover:border-[#b8d0ea] hover:bg-white focus:bg-white text-sm';

    const labelClass = 'block text-xs font-semibold text-[#223A5C] mb-1.5 tracking-wide';

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
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <header className="w-full">
                <Navbar auth={auth} />
            </header>

            {/* Hero */}
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
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#a8c8f0',
                        border: '1px solid rgba(255,255,255,0.15)',
                    }}
                >
                    Dinas Pendidikan
                </span>
                <h1 className="text-white text-2xl md:text-3xl font-bold text-center leading-snug mb-2">
                    Permohonan Layanan Pendidikan
                </h1>
                <p className="text-white/50 text-sm text-center">
                    Isi formulir berikut untuk mengajukan permohonan layanan
                </p>
            </div>

            {/* Form */}
            <div className="px-4 pb-20 -mt-10 relative z-10 mb-10">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-[#e4ecf5] p-8 md:p-10">

                    {errorMessage && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 whitespace-pre-line">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Section 1 */}
                        {sectionLabel('Informasi Pemohon')}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label className={labelClass}>Nama Lengkap</label>
                                {/* <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nama lengkap"
                                    className={inputClass}
                                /> */}
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    readOnly
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Email</label>
                                {/* <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan email"
                                    className={inputClass}
                                /> */}
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className={inputClass}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Alamat / Sekolah</label>
                                <input
                                    type="text"
                                    name="alamatSekolah"
                                    value={formData.alamatSekolah}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan alamat sekolah"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-[#e8eef5] mb-6" />

                        {/* Section 2 */}
                        {sectionLabel('Detail Kegiatan')}

                        <div className="grid grid-cols-1 gap-5 mb-6">
                            <div>
                                <label className={labelClass}>Nama Kegiatan</label>
                                <input
                                    type="text"
                                    name="namaKegiatan"
                                    value={formData.namaKegiatan}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nama kegiatan"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Keperluan</label>
                                <div className="relative">
                                    <select
                                        name="keperluan"
                                        value={formData.keperluan}
                                        onChange={handleChange}
                                        required
                                        className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                                    >
                                        <option value="">Pilih keperluan</option>
                                        <option value="Permintaan Data">Permintaan Data</option>
                                        <option value="Permintaan Narasumber">Permintaan Narasumber</option>
                                        <option value="Konsultasi yang Lain">Konsultasi yang Lain</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                        <svg
                                            className="w-4 h-4 text-[#8fa5c0]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {showCustomKeperluan && (
                                <div>
                                    <label className={labelClass}>Jelaskan Konsultasi</label>
                                    <input
                                        type="text"
                                        name="customKeperluan"
                                        value={formData.customKeperluan}
                                        onChange={handleChange}
                                        required
                                        placeholder="Deskripsikan konsultasi Anda"
                                        className={inputClass}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="h-px bg-[#e8eef5] mb-6" />

                        {/* Section 3 */}
                        {sectionLabel('Lampiran & Kontak')}

                        <div className="grid grid-cols-1 gap-5 mb-8">
                            {/* Upload Zone */}
                            <div>
                                <label className={labelClass}>Upload PDF (Maksimal 3)</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#c8d8ea] rounded-xl bg-[#f5f9fd] p-6 cursor-pointer hover:border-[#223A5C] hover:bg-[#eef4fb] transition-all duration-200">
                                    <div className="w-10 h-10 rounded-full bg-[#dce8f5] flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-[#223A5C]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-[#6a8aaa]">Klik untuk memilih file PDF</p>
                                    <p className="text-xs text-[#a0b5c8]">Format: PDF &bull; Maksimal 3 file</p>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>

                                {formData.files.length > 0 && (
                                    <div className="mt-3 flex flex-col gap-2">
                                        {formData.files.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 bg-[#eef4fb] border border-[#d0e3f5] rounded-xl px-4 py-2.5"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-[#223A5C] flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        className="w-3.5 h-3.5 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                                                    </svg>
                                                </div>
                                                <span className="flex-1 text-sm text-[#223A5C] font-medium truncate">
                                                    {file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteFile(index)}
                                                    className="text-red-400 hover:text-red-600 text-lg leading-none transition-colors"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Kontak */}
                            <div>
                                <label className={labelClass}>Nomor Kontak</label>
                                <input
                                    type="text"
                                    name="kontak"
                                    value={formData.kontak}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nomor handphone"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #223A5C, #2e5080)',
                                boxShadow: '0 4px 16px rgba(34,58,92,0.25)',
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.2}
                                    >
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Kirim Permohonan
                                </>
                            )}
                        </button>

                    </form>
                </div>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                    style={{ background: 'rgba(15,30,50,0.5)' }}
                >
                    <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-sm w-[90%]">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-green-600 mb-2">Permohonan Berhasil!</h2>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Permohonan layanan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.
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

export default PermohonanLayanan;