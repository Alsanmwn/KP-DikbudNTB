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
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Pengajuan Surat</h3>
                <div className="flex items-center justify-center space-x-12 max-w-6xl mx-auto">
                    <div className="relative">
                            <img 
                                src="/assets/Surat.png" 
                                alt="Profil Kami" 
                                className="w-[548px] h-[305px] object-cover rounded-[10px] cursor-pointer"
                            />
                    </div>

                    {/* Judul dan Deskripsi */}
                    <div className="text-left max-w-lg">
                        <h4 className="text-[20px] font-bold text-[#223A5C] mb-4">Surat dapat Anda Kirim Melalui Link dibawah ini:</h4>
                        <p className="text-[18px] text-[#555] text-justify">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfD4T0GRb15l-0_gsSHsPwn2dgVoJRPpRlwaFotQX8MWZT8wQ/viewform?usp=dialog" target="_blank" className="text-blue-500 hover:underline">
                            https://docs.google.com/forms/d/e/1FAIpQLSfD4T0GRb15l-0_gsSHsPwn2dgVoJRPpRlwaFotQX8MWZT8wQ/viewform?usp=dialog</a>
                        </p>

                    </div>
                </div>
            </section>
        <Footer/>
        </div>
    );
};

export default PengajuanSurat;