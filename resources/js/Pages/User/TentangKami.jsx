import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const TentangKami = ({ auth }) => {
    const boxStyle = "flex flex-col items-center bg-white shadow-lg rounded-md p-4"; // Atur sesuai kebutuhan
    const lineStyle = "border-l-2 border-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2"; // Atur sesuai kebutuhan
    const horizontalLineStyle = "border-t-2 border-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2"; // Atur sesuai kebutuhan

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
        
            {/* Tentang Kami Section */}
            <section className="bg-white text-center pb-16 px-4">
                <h3 
                    className="text-[25px] font-bold text-[#223A5C] mb-6" 
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                    Tentang Kami
                </h3>

                {/* Teks rata kanan-kiri */}
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[18px] text-[#223A5C] leading-relaxed mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus. 
                        Duis dignissim nibh porta, sodales nibh ullamcorper, cursus nunc. 
                    </p>

                    {/* Garis horizontal di bawah teks */}
                    <hr 
                        className="border-t-2 border-gray-300 mt-4 mx-auto" 
                        style={{ width: '20%', borderColor: '#223A5C' }}
                    />
                </div>
            </section>

            {/* Bottom Image Section with Overlay */}
            <section className="relative mb-32">
                <div className="flex justify-center items-center">
                    <img 
                        src="/assets/sunset.png" 
                        alt="Deskripsi gambar" 
                        className="w-[1220px] h-[300px] object-cover"
                    />
                </div>
                {/* Description Overlay */}
                <div className="absolute top-60  left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1000px] bg-white shadow-lg p-6">
                    <h2 className="text-[#223A5C] text-xl font-semibold mb-1">
                        Selamat Datang di Website Kami
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus. Duis dignissim nibh porta, 
                        sodales nibh ullamcorper, cursus nunc. Morbi rhoncus purus id libero rhoncus, ac eleifend lacus auctor. Curabitur eleifend, 
                        nisi in malesuada faucibus, dui elit bibendum lectus, eget aliquam purus sem ac metus.
                    </p>
                </div>
            </section>
            <section className="flex justify-center gap-9 mb-28 relative">
                <div className="w-auto relative">
                    <img 
                        src="/assets/bunga.png" 
                        alt="Deskripsi gambar 1" 
                        className="w-[540px] h-[340px] object-cover"
                    />
                    {/* Overlay untuk gambar bunga */}
                    <div className="absolute top-64 left-16 w-[400px] h-[140px] bg-white shadow-lg p-4 flex flex-col justify-center items-start">
                        <h3 className="text-xl font-semibold text-[#223A5C] mb-2 text-left">Visi</h3>
                        <p className="text-sm text-gray-700 text-left">Deskripsi tentang gunung, yang menggambarkan keindahan dan detail lainnya tentang gambar gunung ini.</p>
                    </div>
                </div>
                <div className="w-auto relative">
                    <img 
                        src="/assets/gunung.png" 
                        alt="Deskripsi gambar 2" 
                        className="w-[540px] h-[340px] object-cover"
                    />
                    {/* Overlay untuk gambar gunung */}
                    <div className="absolute top-64 left-16 w-[400px] h-[140px] bg-white shadow-lg p-4 flex flex-col justify-center items-start">
                        <h3 className="text-xl font-semibold text-[#223A5C] mb-2 text-left">Misi</h3>
                        <p className="text-sm text-gray-700 text-left">Deskripsi tentang gunung, yang menggambarkan keindahan dan detail lainnya tentang gambar gunung ini.</p>
                    </div>
                </div>
            </section>
            <section className="bg-white text-center pb-16 px-4">
                <h3 
                    className="text-[25px] font-bold text-[#223A5C] mb-3" 
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                    STRUKTUR ORGANISASI
                </h3>

                {/* Teks rata kanan-kiri */}
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[18px] text-[#223A5C] leading-relaxed mb-4 font-semibold">
                        BALAI PENGEMBANGAN TEKNOLOGI PENDIDIKAN (BPTP)<br/> DINAS PENDIDIKAN DAN KEBUDAYAAN<br/>PROVINSI NUSA TENGGARA BARAT<br/>
                    </p>

                    {/* Garis horizontal di bawah teks */}
                    <hr 
                        className="border-t-2 border-gray-300 mt-4 mx-auto" 
                        style={{ width: '20%', borderColor: '#223A5C' }}
                    />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default TentangKami; 