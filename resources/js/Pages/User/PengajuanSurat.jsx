import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const PengajuanSurat = ({ auth }) => {
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
        
            <section className="bg-white text-center pb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Pengajuan Surat</h3>
                <div className="flex flex-col lg:flex-row items-start justify-center space-y-8 lg:space-y-0 lg:space-x-12 max-w-6xl mx-auto">
                    {/* Judul dan Deskripsi Surat Umum */}
                    <div className="bg-gray-100 p-6 rounded-[10px] shadow-md max-w-md w-full">
                        <h5 className="text-[18px] font-semibold text-[#223A5C] mb-2">Pengajuan Surat Umum</h5>
                        <p className="text-[16px] text-[#555] text-justify mb-4">
                            Jika Anda ingin mengajukan surat untuk keperluan umum, seperti permintaan izin atau pengajuan surat lainnya, Anda dapat mengirimkan surat melalui formulir di bawah ini:
                        </p>
                        <p className="text-[18px] text-[#555] text-justify">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfD4T0GRb15l-0_gsSHsPwn2dgVoJRPpRlwaFotQX8MWZT8wQ/viewform?usp=dialog" target="_blank" className="text-blue-500 hover:underline">
                                Link Pengajuan Surat Umum
                            </a>
                        </p>
                    </div>

                    {/* Judul dan Deskripsi Surat Fasilitas/Juru Bicara */}
                    <div className="bg-gray-100 p-6 rounded-[10px] shadow-md max-w-md w-full">
                        <h5 className="text-[18px] font-semibold text-[#223A5C] mb-2">Pengajuan Permintaan Fasilitas / Juru Bicara</h5>
                        <p className="text-[16px] text-[#555] text-justify mb-4">
                            Jika Anda memerlukan fasilitas khusus atau ingin mengajukan permintaan untuk juru bicara, silakan isi formulir di bawah ini untuk pengajuan lebih lanjut:
                        </p>
                        <p className="text-[18px] text-[#555] text-justify">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfD4T0GRb15l-0_gsSHsPwn2dgVoJRPpRlwaFotQX8MWZT8wQ/viewform?usp=dialog" target="_blank" className="text-blue-500 hover:underline">
                                Link Pengajuan Permintaan Fasilitas / Juru Bicara
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PengajuanSurat;