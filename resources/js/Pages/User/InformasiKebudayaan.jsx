import React from 'react';
import Navbar from '@/Components/Navbar'; 
import Footer from '@/Components/Footer';

const InformasiKebudayaan = () => {
    return (
        <>
            <Navbar />
            <section
                className="flex flex-col items-center pb-16 mx-100  mt-16" 
            >
                <h3
                    className="text-[25px] font-bold text-center text-[#223A5C] mb-8 mt-8"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                    Informasi Kebudayaan
                </h3>
                <div className="flex items-center gap-6 mx-20">
                    {/* Tulisan di sebelah kanan */}
                    <div className="text-[#223A5C] mr-5 flex-1">
                        <h4 className="text-[20px] font-bold mb-4">Menelusuri Tradisi dan Seni di NTB</h4>
                        <p className="mb-6">
                            Kebudayaan Nusa Tenggara Barat mencerminkan kekayaan sejarah dan tradisi yang telah ada selama 
                            berabad-abad. Dari seni ukir yang indah hingga masakan khas yang menggugah selera, setiap elemen 
                            budaya NTB memiliki makna yang mendalam. Jika Anda ingin memahami lebih dalam tentang kebudayaan 
                            yang membentuk identitas masyarakat NTB, klik tombol di bawah ini untuk menjelajahi informasi yang 
                            menarik! 
                        </p>

                        {/* Tombol */}
                        <div className="flex gap-4">
                            <a
                                href="https://ntbprov.go.id/post/program-unggulan/taman-budaya-ntb-rumah-bagi-para-seniman"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Taman Budaya NTB
                            </a>
                            <a
                                href="https://museum.kemdikbud.go.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Museum Kemdikbud
                            </a>
                        </div>
                    </div>

                    {/* Gambar di sebelah kiri dengan ukuran yang tetap */}
                    <div className="flex-shrink-0 w-[300px] h-auto mx-5">
                        <img
                            src="/assets/logobtidp.png"
                            alt="Informasi Kebudayaan"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>
            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </>
    );
};

export default InformasiKebudayaan;