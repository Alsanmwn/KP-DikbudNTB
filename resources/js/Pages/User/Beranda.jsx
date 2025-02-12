import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer'; // Impor Footer
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import axios from 'axios';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'

export default function Beranda({ auth }) {
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [date, setDate] = useState(new Date());
    const [kegiatanList, setKegiatanList] = useState([]);
    const [pastKegiatanList, setPastKegiatanList] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchKegiatan = async () => {
            try {
                const response = await axios.get('/api/kegiatan');
                const today = new Date();
                today.setHours(0, 0, 0, 0);  // Set the current date to 00:00 for comparison
    
                // Filter kegiatan yang belum terjadi dan urutkan berdasarkan tanggal
                const upcomingKegiatan = response.data
                    .filter(kegiatan => new Date(kegiatan.tanggal) >= today)
                    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                    .slice(0, 5); // Limit to 5 kegiatan to match the existing UI
    
                // Kegiatan yang sudah dilakukan
                const pastKegiatan = response.data
                    .filter(kegiatan => new Date(kegiatan.tanggal) < today)
                    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
                    .slice(0, 5);
    
                // Menambahkan kondisi status "closed" sehari sebelum kegiatan
                const updatedUpcomingKegiatan = upcomingKegiatan.map(kegiatan => {
                    const kegiatanDate = new Date(kegiatan.tanggal);
                    kegiatanDate.setHours(0, 0, 0, 0); // Pastikan waktu di-set ke 00:00 untuk perbandingan
    
                    // Jika tanggal kegiatan adalah besok, ubah status menjadi "closed"
                    if (kegiatanDate - today <= 24 * 60 * 60 * 1000) {  // 24 jam dalam milidetik
                        kegiatan.status = 'closed';
                    }
    
                    return kegiatan;
                });
    
                setKegiatanList(updatedUpcomingKegiatan);
                setPastKegiatanList(pastKegiatan);
            } catch (error) {
                console.error("Error fetching kegiatan:", error);
            }
        };
    
        fetchKegiatan();
    }, []);
    

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col">
            <header className="w-full">
                <Navbar auth={auth} />
            </header>


            {/* Hero Section */}
            <div className="relative flex justify-center items-center flex-1 mb-1">
                <img
                    src="/assets/landingpage.png"
                    alt="Deskripsi gambar"
                    className="w-full h-screen object-cover"
                />
                <div className="absolute text-left left-10 pl-6">
                    <h1 className="text-white text-[25px] font-regular mb-2">
                        Selamat datang di BTIDP
                    </h1>
                    <h2 className="text-white text-[40px] font-bold">
                        Balai Teknologi Informasi <br /> dan
                        Data Pendidikan
                    </h2>
                </div>
            </div>


            {/* Statistik Section */}
            <section className="bg-white text-center py-12">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Statistik</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl">
                        <div className="p-6 border-2 border-[#0E2038] rounded-lg shadow-lg">
                            <img src="/assets/School.png" alt="Sekolah" className="mx-auto mb-4 w-16" />
                            <h4 className="text-xl font-semibold text-[#223A5C]">Sekolah</h4>
                            <p className="text-xl font-bold">350</p>
                        </div>
                        <div className="p-6 border-2 border-[#0E2038] rounded-lg shadow-lg">
                            <img src="/assets/Students.png" alt="Siswa" className="mx-auto mb-4 w-16" />
                            <h4 className="text-xl font-semibold text-[#223A5C]">Siswa</h4>
                            <p className="text-xl font-bold">120,000</p>
                        </div>
                        <div className="p-6 border-2 border-[#0E2038] rounded-lg shadow-lg">
                            <img src="/assets/Training.png" alt="Guru" className="mx-auto mb-4 w-16" />
                            <h4 className="text-xl font-semibold text-[#223A5C]">Guru</h4>
                            <p className="text-xl font-bold">8,500</p>
                        </div>
                    </div>
            </section>
           
            {/* Profil Kami */}
            <section className="bg-white text-center py-3 pb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Profil Kami</h3>
                <div className="flex items-center justify-center space-x-14 max-w-6xl mx-auto">
                    {/* Gambar yang dapat diklik */}
                    <div className="relative">
                        <a href="https://www.youtube.com/@btidpntbchannel4371" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/assets/fotodikbud.png"
                                alt="Profil Kami"
                                className="w-[548px] h-[305px] object-cover rounded-[10px] shadow-lg cursor-pointer"
                            />
                            {/* Logo YouTube di tengah gambar */}
                            <div className="absolute inset-0 flex justify-center items-center">
                                <a href="https://www.youtube.com/@btidpntbchannel4371" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="/assets/Youtube.png"
                                        alt="YouTube Logo"
                                        className="w-16 h-16 cursor-pointer"
                                    />
                                </a>
                            </div>
                        </a>
                    </div>


                    {/* Judul dan Deskripsi */}
                    <div className="text-left max-w-lg">
                        <h4 className="text-[20px] font-bold text-[#223A5C] mb-4">Channel Kami</h4>
                        <p className="text-[18px] text-[#555] text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus.
                            Duis dignissim nibh porta, sodales nibh ullamcorper, cursus nunc. In eget tempor tortor.
                            Morbi rhoncus purus id libero rhoncus, ac eleifend lacus auctor. Curabitur eleifend, nisl
                            in malesuada faucibus, dui elit bibendum lectus, eget aliquet purus sem ac risus.
                        </p>
                    </div>
                </div>
            </section>


            {/* Kegiatan Yang Telah Kami Lakukan */}
            <section className="bg-[#223A5C] py-8 pb-28 mb-14 w-full h-[567px]">
                <h3 className="text-white text-center text-[25px] font-bold mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    Dokumentasi Kegiatan
                </h3>
                <div className="flex justify-between mx-auto max-w-6xl gap-3">
                {/* Kiri */}
                <div className="space-y-4 ">
                    {pastKegiatanList.slice(0, 2).map((kegiatan, index) => (
                        <div key={kegiatan.id} className="relative">
                            <img
                                src={`/storage/${kegiatan.gambar}`}
                                alt={kegiatan.nama}
                                className="w-[400px] h-[200px] object-cover rounded-[8px]" // Radius ditambahkan di sini
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-40 p-4 h-1/2 flex flex-col justify-center items-center w-full rounded-b-[10px]">
                                <h4 className="text-white text-[18px] font-bold text-center px-4">
                                    {kegiatan.nama}
                                </h4>
                                {kegiatan.link_kegiatan && (
                                    <a 
                                        href={kegiatan.link_kegiatan} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="border-2 border-white text-white p-1 px-4 text-[10px] rounded-md"
                                    >
                                        Baca Selengkapnya
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tengah */}
                {pastKegiatanList.length > 2 && (
                    <div className="relative">
                        <img
                            src={`/storage/${pastKegiatanList[2].gambar}`}
                            alt={pastKegiatanList[2].nama}
                            className="w-[350px] h-[416px] object-cover rounded-[8px]" // Radius ditambahkan di sini
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-40 p-4 h-1/2 flex flex-col justify-center items-center w-full rounded-b-[10px]">
                            <h4 className="text-white text-[18px] font-bold text-center px-4">
                                {pastKegiatanList[2].nama}
                            </h4>
                            <Link 
                                href={pastKegiatanList[2].link_kegiatan || `/kegiatan/${pastKegiatanList[2].id}`} 
                                className="border-2 border-white text-white p-1 px-4 text-[10px] rounded-md"
                            >
                                Baca Selengkapnya
                            </Link>
                        </div>
                    </div>
                )}

                {/* Kanan */}
                <div className="space-y-4">
                    {pastKegiatanList.slice(3, 5).map((kegiatan, index) => (
                        <div key={kegiatan.id} className="relative">
                            <img
                                src={`/storage/${kegiatan.gambar}`}
                                alt={kegiatan.nama}
                                className="w-[400px] h-[200px] object-cover rounded-[8px]" // Radius ditambahkan di sini
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-40 p-4 h-1/2 flex flex-col justify-center items-center w-full rounded-b-[10px]">
                                <h4 className="text-white text-[18px] font-bold text-center px-4">
                                    {kegiatan.nama}
                                </h4>
                                {kegiatan.link_kegiatan && (
                                    <a 
                                        href={kegiatan.link_kegiatan} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="border-2 border-white text-white p-1 px-4 text-[10px] rounded-md"
                                    >
                                        Baca Selengkapnya
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            </section>

            <section className="bg-white text-center pb-4">
            <h1
                className="text-[25px] font-bold text-[#223A5C]"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
                Agenda Kegiatan
            </h1>
            <div className="flex flex-col md:flex-row mx-auto max-w-6xl">
                {/* Kegiatan List */}
                <div className="w-full md:w-[70%] space-y-6 mt-8">
                    {kegiatanList.slice(0, 3).map(kegiatan => (
                        <div key={kegiatan.id} className="w-full md:w-[770px] h-[240px] p-6 border-2 border-[#0E2038] rounded-lg shadow-lg relative flex items-center">
                            <img
                                src={`/storage/${kegiatan.gambar}`}
                                alt={kegiatan.nama}
                                className="w-[200px] h-[236px] object-cover rounded-md"
                                style={{ marginLeft: "-24px" }}
                                onError={(e) => {
                                    console.log('Error loading image:', kegiatan.gambar); // Debug
                                    e.target.src = '/default-image.jpg';
                                }}
                            />
                            <div className="flex flex-col justify-center text-left ml-6">
                                <h2 className="text-[18px] font-bold text-[#0E2038] mb-4">
                                    {kegiatan.nama}
                                </h2>
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex gap-x-2">
                                        <p className="text-[15px] text-gray-700 font-bold w-[100px]">Waktu</p>
                                        <p className="text-sm text-gray-700">: {kegiatan.waktu}</p>
                                    </div>
                                    <div className="flex gap-x-2">
                                        <p className="text-[15px] text-gray-700 font-bold w-[100px]">Tanggal</p>
                                        <p className="text-sm text-gray-700">: {new Date(kegiatan.tanggal).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <div className="flex gap-x-2">
                                        <p className="text-[15px] text-gray-700 font-bold w-[100px]">Lokasi</p>
                                        <p className="text-sm text-gray-700">: {kegiatan.lokasi}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 w-full mt-4">
                                    <div className={`py-1 px-1 w-[140px] text-center rounded-lg shadow-lg text-[10px] ${kegiatan.status === 'open for public' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                        {kegiatan.status}
                                    </div>
                                    {/* Cek jika status kegiatan bukan 'closed' */}
                                    {kegiatan.status !== 'closed' && (
                                        <Link
                                            href={route('kegiatan.detail', { id: kegiatan.id })}
                                            className="py-1 px-1 w-[140px] bg-white-10 font-bold text-[#223A5C] text-center rounded-lg shadow-lg text-[10px]"
                                            style={{ boxShadow: "0 4px 9px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}
                                        >
                                            Lihat Detail
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Kalender */}
                <div className="w-full md:w-[30%] mt-6 md:mt-0 ml-6 pt-8">
                    <div className="bg-[#0E2038] w-full p-4 rounded-lg shadow-lg">
                        <h4 className="text-white text-xl font-semibold mb-4">
                            Kalender Kegiatan
                        </h4>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="custom-calendar"
                            />
                        </div>
                        <p className="text-white mt-4">
                            Tanggal yang dipilih:{" "}
                            <span className="font-bold">{date.toLocaleDateString()}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Link
                    href={route('agenda-kegiatan')}  
                    className="text-[15px] font-regular text-[#0095FF] mb-8"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                    Show More {'>>>'}
                </Link>
            </div>
        </section>



            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10  p-3 rounded-full shadow-lg hover:bg-[#0E2038] transition-colors"
                >
                    ↑
                </button>
            )}

            <section className="bg-white text-center py-16 pb-16">
                <h3 className="text-[25px] font-bold text-[#223A5C] mb-8" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Layanan Kami</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl">
                    <div className="p-8 border-2 border-[#0E2038] rounded-lg shadow-lg">
                        <img src="/assets/letter.png" alt="Sekolah" className="mx-auto mb-4 w-24" />
                        <Link href="User/pengajuan-surat">
                            <h4 className="text-xl font-semibold text-[#223A5C]">Pengajuan Surat</h4>
                        </Link>
                        <p className="text-xl font-reguler mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus. Duis dignissim
                            nibh porta, sodales nibh ullamcorper, cursus nunc. In eget tempor tortor.
                        </p>
                    </div>
                    <div className="p-8 border-2 border-[#0E2038] rounded-lg shadow-lg">
                        <img src="/assets/Data.png" alt="Siswa" className="mx-auto mb-4 w-24" />
                        <Link href="User/data-pendidikan">
                            <h4 className="text-xl font-semibold text-[#223A5C]">Data Pendidikan</h4>
                        </Link>
                        <p className="text-xl font-reguler mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus. Duis dignissim
                            nibh porta, sodales nibh ullamcorper, cursus nunc. In eget tempor tortor.
                        </p>
                    </div>
                    <div className="p-8 border-2 border-[#0E2038] rounded-lg shadow-lg">
                        <img src="/assets/Study.png" alt="Guru" className="mx-auto mb-4 w-24" />
                        <a href="https://ayomi.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <h4 className="text-xl font-semibold text-[#223A5C]">
                                Rumah Belajar
                            </h4>
                        </a>
                        <p className="text-xl font-reguler mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eleifend lectus. Duis dignissim
                            nibh porta, sodales nibh ullamcorper, cursus nunc. In eget tempor tortor.
                        </p>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="w-full mt-auto">
                <Footer />
            </footer>


            {/* Tombol scroll ke atas */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 bg-white bg-opacity-80 border-2 border-[#223A5C] text-[#223A5C] p-3 rounded-[15px] shadow-lg hover:bg-opacity-100 hover:border-blue-700 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 font-bold"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7-7-7 7M12 15V3"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
