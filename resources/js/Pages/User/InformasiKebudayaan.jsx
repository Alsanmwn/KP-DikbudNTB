import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const InformasiKebudayaan = () => {
    return (
        <>
            <Navbar />
            <section
                className="px-4 sm:px-8 lg:px-16 py-20"
                style={{ background: '#F7F9FC' }}
            >
                <div className="max-w-6xl mx-auto mb-10 mt-10">
                        <div className="flex flex-col lg:flex-row">

                            <div
                                className="lg:w-2/5 flex items-center justify-center rounded-lg p-10 lg:p-14 relative"
                                style={{
                                    background: 'linear-gradient(160deg, #EEF2F8 0%, #dde4f0 100%)',
                                }}
                            >
                                <div
                                    className="absolute w-64 h-64 rounded-full border-2 opacity-20"
                                    style={{ borderColor: '#223A5C' }}
                                />
                                <div
                                    className="absolute w-48 h-48 rounded-full border opacity-10"
                                    style={{ borderColor: '#2A7F62' }}
                                />
                                <img
                                    src="/assets/logobtidp.png"
                                    alt="Informasi Kebudayaan"
                                    className="w-40 sm:w-52 lg:w-64 h-auto object-contain relative z-10 drop-shadow-lg"
                                />
                            </div>

                            <div className="lg:w-3/5 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                                <h4
                                    className="text-2xl sm:text-3xl font-bold mb-5"
                                    style={{
                                        color: '#1A2E4A',
                                        fontFamily: "'Georgia', serif",
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    Menelusuri Tradisi dan Seni di NTB
                                </h4>

                                <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: '#4A6080' }}>
                                    Kebudayaan Nusa Tenggara Barat mencerminkan kekayaan sejarah dan tradisi
                                    yang telah ada selama berabad-abad. Dari seni ukir yang indah hingga
                                    masakan khas yang menggugah selera, setiap elemen budaya NTB memiliki
                                    makna yang mendalam. Jika Anda ingin memahami lebih dalam tentang
                                    kebudayaan yang membentuk identitas masyarakat NTB, klik tombol di
                                    bawah ini untuk menjelajahi informasi yang menarik!
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="https://ntbprov.go.id/post/program-unggulan/taman-budaya-ntb-rumah-bagi-para-seniman"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                                        style={{ background: 'linear-gradient(135deg, #223A5C, #1A2E4A)' }}
                                    >
                                        Taman Budaya NTB
                                    </a>

                                    <a
                                        href="https://museumnegeri.ntbprov.go.id/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                                        style={{ background: 'linear-gradient(135deg, #2A7F62, #1E6050)' }}
                                    >
                                        Museum Negeri NTB
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full">
                <Footer />
            </footer>
        </>
    );
};

export default InformasiKebudayaan;