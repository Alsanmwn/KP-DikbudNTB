import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

const DetailKegiatan = ({ auth }) => {
    return (
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="w-full">
                <Navbar auth={auth} />
            </header>

            {/* Hero Section */}
            <div className="relative flex justify-center items-center flex-1 mb-10">
                <img 
                    src="/assets/landingpage.png" 
                    alt="Deskripsi gambar" 
                    className="w-full h-[390px] object-cover"
                />
            </div>

            <section className="bg-white text-center pb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Detail Kegiatan</h3>
                <div className="flex items-stretch justify-center space-x-10 max-w-6xl mx-auto">
                    {/* Teks di sebelah kiri */}
                    <div className="text-left max-w-lg flex flex-col items-stretch">
                        <div>
                            <p className="text-[20px] font-reguler text-[#223A5C] text-justify mb-6">
                                Kegiatan ini bertujuan untuk mempererat kerja sama antara Pusat Data dan Teknologi Informasi 
                                (Pusdatin) Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi dengan Dinas Pendidikan dan 
                                Kebudayaan Provinsi Nusa Tenggara Barat (NTB) dalam implementasi MoU terkait pengelolaan data 
                                pendidikan. Diskusi ini akan membahas langkah-langkah strategis untuk optimalisasi pemanfaatan 
                                data pendidikan di NTB, termasuk peningkatan kualitas data, integrasi sistem informasi, dan 
                                pemanfaatan data untuk pengambilan keputusan berbasis bukti.
                            </p>
                            
                            {/* Judul di bawah teks */}
                            <h4 className="text-[22px] font-bold text-[#223A5C] mb-4">Peserta akan diajak untuk:</h4>
                            
                            {/* Daftar urutan */}
                            <ol className="list-decimal list-inside text-[18px] text-[#555] mb-10">
                                <li>Peningkatan kualitas data pendidikan di NTB.</li>
                                <li>Integrasi sistem informasi untuk kemudahan akses data.</li>
                                <li>Pelatihan pengelolaan data untuk tenaga pendidik.</li>
                                <li>Pemanfaatan data untuk kebijakan berbasis bukti.</li>
                                <li>Pemantauan dan evaluasi secara berkala.</li>
                            </ol>
                        </div>

                        {/* Waktu dan Tempat */}
                        <div className="mb-10">
                            <h4 className="text-[22px] font-bold text-[#223A5C] mb-6">Waktu dan Tempat:</h4>
                            <div className="flex flex-col space-y-4 text-[18px] text-[#555]">
                                <div className="flex items-center space-x-3">
                                    <FaMapMarkerAlt className="text-[#223A5C]" />
                                    <span>Lokasi: Gedung Dinas Pendidikan NTB, Jalan Pendidikan No. 10, Mataram</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaCalendarAlt className="text-[#223A5C]" />
                                    <span>Tanggal: 15 Januari 2025</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaClock className="text-[#223A5C]" />
                                    <span>Waktu: 09:00 - 16:00 WITA</span>
                                </div>
                            </div>
                        </div>

                        {/* Judul Baru dengan Link Pendaftaran */}
                        <div>
                            <h4 className="text-[22px] font-bold text-[#223A5C] mb-6">Link Pendaftaran Kegiatan:</h4>
                            <a 
                                href="https://ayomi.vercel.app/" 
                                className="text-[18px] text-blue-500 hover:underline"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                https://ayomi.vercel.app/
                            </a>
                        </div>
                    </div>

                    {/* Gambar di sebelah kanan */}
                    <div className="relative ml-10">
                        <img 
                            src="/assets/logobtidp.jpg" 
                            alt="Profil Kami" 
                            className="w-[450px] h-[350px] object-cover rounded-[10px] shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DetailKegiatan;
