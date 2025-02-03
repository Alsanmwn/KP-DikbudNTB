import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

const DetailKegiatan = ({ auth, kegiatan }) => {
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
                    alt={kegiatan.nama}
                    className="w-full h-[390px] object-cover"
                />
            </div>

            <section className="bg-white text-center pb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Detail Kegiatan</h3>
                <div className="flex flex-col lg:flex-row items-stretch justify-center lg:space-x-10 max-w-6xl mx-auto">
                    {/* Teks di sebelah kiri */}
                    <div className="text-left max-w-lg flex flex-col items-stretch">
                        <div>
                            <p className="text-[20px] font-regular text-[#223A5C] text-justify mb-6">
                                {kegiatan.deskripsi}
                            </p>
                        </div>

                        {/* Waktu dan Tempat */}
                        <div className="mb-10">
                            <h4 className="text-[22px] font-bold text-[#223A5C] mb-6">Waktu dan Tempat:</h4>
                            <div className="flex flex-col space-y-4 text-[18px] text-[#555]">
                                <div className="flex items-center space-x-3">
                                    <FaMapMarkerAlt className="text-[#223A5C]" />
                                    <span>Lokasi: {kegiatan.lokasi}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaCalendarAlt className="text-[#223A5C]" />
                                    <span>Tanggal: {new Date(kegiatan.tanggal).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaClock className="text-[#223A5C]" />
                                    <span>Waktu: {kegiatan.waktu}</span>
                                </div>
                            </div>
                        </div>

                        {/* Link Pendaftaran */}
                        <div>
                            <h4 className="text-[22px] font-bold text-[#223A5C] mb-6">Link Pendaftaran Kegiatan:</h4>
                            <a
                                href={kegiatan.link_pendaftaran || "#"}  // Use the link from the database or fallback to "#" if not available
                                className="text-[18px] text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {kegiatan.link_pendaftaran || "No registration link available"}  {/* Display a default message if link is missing */}
                            </a>
                        </div>
                    </div>

                    {/* Gambar di sebelah kanan */}
                    <div className="relative mt-10 lg:mt-0 lg:ml-10">
                        <img
                            src={kegiatan.gambar ? `/storage/${kegiatan.gambar}` : "/assets/logobtidp.jpg"}
                            alt={kegiatan.nama}
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
