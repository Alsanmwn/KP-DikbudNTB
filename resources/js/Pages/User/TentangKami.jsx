import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from 'axios';

const STYLES = {
  title: "text-[25px] font-bold text-[#223A5C] mb-6",
  sectionPadding: "px-4 py-16",
};

const SectionTitle = ({ children, className = "" }) => (
  <h3
    className={`${STYLES.title} ${className}`}
    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
  >
    {children}
  </h3>
);

const HeroSection = () => (
  <div className="relative flex justify-center items-center flex-1 mb-2">
    <img
      src="/assets/landingpage.png"
      alt="Hero image"
      className="w-full h-[390px] object-cover"
    />
  </div>
);

const AboutSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl font-bold text-[#223A5C] mb-6">Tentang Kami</h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[18px] text-[#223A5C] leading-relaxed mb-2">
          Balai Teknologi Informasi dan Data Pendidikan dipimpin oleh Kepala Balai
          yang dibantu oleh Kasubbag Tata Usaha, Kepala Seksi Pemanfaatan Teknologi
          Informasi dan Data Pendidikan serta Kepala Seksi Pengembangan Media
          Pembelajaran. Dalam menjalankan tusinya sebagai Unit Pelaksana Teknis
          Dinas Dikbud dibantu juga oleh Fungsional Pengembang Teknologi
          Pembelajaran (PTP) dan Pranata Komputer (Prakom).
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-700 font-semibold px-6 py-2 transition"
        >
          Selengkapnya {'>>>'}
        </button>
        <hr className="border-t-2 border-[#223A5C] mt-4 mx-auto w-1/5" />
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#223A5C] mb-4">Sejarah BTIDP</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-justify">
              {/* Card 1 */}
              <div className="border border-[#223A5C] p-4 rounded-lg shadow-md w-full">
                <h4 className="text-lg font-semibold text-[#223A5C]">BTKP <br/> Balai Teknologi Komunikasi Pendidikan</h4>
                <p className="text-sm text-gray-600 mt-2">
                      Sebelum menjadi Balai Teknologi Komunikasi Pendidikan awalnya bernama Sanggar Teknologi
                    Komunikasi Pendidikan di bawah naungan Pusat Teknologi Komunikasi (Pustekkom) yang secara tekni
                    operasional bertanggung jawab kepada Kepala Kanto Wilayah Pendidikan dan Kebudayaan Provinsi Nusa
                    Tenggara Barat. Sekitar tahun 2001 dengan diberlakukannya Otonomi Daerah maka sejak itulah berubah nama menjadi Bala
                    Teknologi Komunikasi Pendidikan (BTKP) di bawah kendali Pemerintah Provinsi NTB sesuai SK Gubernur
                    nomor 484 Tahun 2001, Tanggal 23 Desember 2001
                    </p>
              </div>
              {/* Card 2 */}
              <div className="border border-[#223A5C] p-4 rounded-lg shadow-md w-full">
                <h4 className="text-lg font-semibold text-[#223A5C]">BTIKP <br/> Balai Teknologi Informasi dan Komunikasi Pendidikan (Dinas Dikbud)</h4>
                <p className="text-sm text-gray-600 mt-2">
                      Seiring dengan perkembangan kelembagaan dan tuntutan tentang Pembentukan dan
                    Susunan Perangkat Daerah Provinsi Nusa Tenggara Barat maka dilakukan perombakan
                    struktur organisasi beserta turunannya dan lahirlah Balai Teknologi Informasi dan Komunikasi 
                    Pendidikan sesuai Peraturan Gubernur nomor 53 Tahun 2016 yang sebelumnya bernama BTKP.
                </p>
              </div>
              {/* Card 3 */}
              <div className="border border-[#223A5C] p-4 rounded-lg shadow-md w-full">
                <h4 className="text-lg font-semibold text-[#223A5C]">BPTP <br/> Balai Pengembangan Teknologi Pembelajaran</h4>
                <p className="text-sm text-gray-600 mt-2">
                      Dengan mengacu pada amanat Permendagri No. 12 Tahun 2017 tentang Pedoman Pembentukan dan Klasifikasi
                    Cabang Dinas dan Unit Pelaksana Teknis Daerah, BTIKP dievaluasi dan dikaji keberadaannya dan hasil rekomendasi
                    Kementerian Dalam Negeri agar diubah tugas pokok dan fungsi serta hasil konsultasi dengan Biro Organisasi Sekretariat Daerah
                    NTB maka Balai Teknologi Informasi dan Komunikasi Pendidikan berubah nama menjadi Balai Pengembangan Teknologi Pendidikan (BPTeknodik) NTB
                </p>
              </div>
              {/* Card 4 */}
              <div className="border border-[#223A5C] p-4 rounded-lg shadow-md w-full">
                <h4 className="text-lg font-semibold text-[#223A5C]">BTIDP <br/> Balai Teknologi Informasi dan Data Pendidikan</h4>
                <p className="text-sm text-gray-600 mt-2">
                      Mengacu pada perubahan nomenklatur lembaga pembina Jabatan Fungsional yang ada di BPTeknodik dalam hal ini adalah
                    Pusat Teknologi Komunikasi (Pustekkom) menjadi Pusat Data dan Informasi serta hasil konsultasi dengan Biro Organisasi Sekretaris
                    Daerah NTB maka BPTeknodik berubah lagi dengan nama Balai Teknologi Informasi dan Data Pendidikan (BTIDP) yang tertuang
                    dalam Peraturan Gubernur nomor 29 Tahun 2018 tanggal 14 September 2018
                </p>
              </div>
            </div>

            {/* Tombol Tutup */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


const WelcomeSection = () => (
  <section className="relative mb-36">
    <div className="flex justify-center items-center">
      <img
        src="/assets/sunset.png"
        alt="Sunset view"
        className="w-full max-w-[1115px] h-[405px] object-cover"
      />
    </div>
    <div className="absolute top-72 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1000px] bg-white shadow-lg p-6 mt-16">
      <h2 className="text-[#223A5C] text-xl font-semibold mb-1">
        Selamat Datang di Website Kami
      </h2>
      <p className="text-gray-600 text-sm">
        Website ini menyediakan layanan Pengajuan Surat, Data Pendidikan, dan Rumah Belajar untuk 
        mendukung kebutuhan pendidikan. Anda juga dapat melihat agenda BTIDP selama setahun, termasuk 
        pelatihan dan seminar. Kami berkomitmen menghadirkan inovasi teknologi demi kemajuan pendidikan.
      </p>
    </div>
  </section>
);

// Mission Popup Component
const MissionPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const missions = [
    "Meningkatkan akses dan mutu pendidikan dengan mengembangkan media, model dan sistem pembelajaran berbasis teknologi bagi semua jalur, jenis dan jenjang pendidikan.",
    "Mewujudkan peningkatan kompetensi sumber daya manusia dan menciptakan pertumbuhan kapasitas manajemen, serta sarana dan prasarana teknologi Pendidikan bagi tenaga pendidik dan kependidikan di semua jalur, jenis dan jenjang pendidikan.",
    "Meningkatkan pelayanan dan pengelolaan pendidikan dengan mengembangkan sistem informasi dan jaringan pendidikan berbasis teknologi.",
    "Mengembangkan kultur lembaga berbasis kinerja dan kebersamaan.",
    "Membangun jejaring kerja dan kemitraan di bidang teknologi Pendidikan."
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#223A5C]">Misi BTIDP</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {missions.map((mission, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-[#223A5C] font-bold min-w-[16px]">•</span>
              <p className="text-[#223A5C]">{mission}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VisionMissionSection = () => {
  const [isMissionPopupOpen, setIsMissionPopupOpen] = useState(false);

  const items = [
    { 
      title: "Visi", 
      image: "/assets/Visi.jpg", 
      description: "Menjadi suatu lembaga pengembangan, pemanfaatan dan pelayanan Teknologi Pendidikan yang kreatif, inovatif dan mencerdaskan." 
    },
    { 
      title: "Misi", 
      image: "/assets/Misi.jpg", 
      description: (
        <div>
          <p className="mb-2">Meningkatkan akses dan mutu pendidikan dengan mengembangkan media, model dan sistem pembelajaran berbasis...</p>
          <button 
            onClick={() => setIsMissionPopupOpen(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            Selengkapnya
          </button>
        </div>
      )
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-9 mb-16 relative">
      {items.map(({ title, image, description }) => (
        <div key={title} className="w-auto relative">
          <img
            src={image}
            alt={`${title} image`}
            className="w-[540px] h-[340px] object-cover"
          />
          <div className="absolute top-64 left-16 w-[400px] h-[140px] bg-white shadow-lg p-4 flex flex-col justify-center items-start">
            <h3 className="text-xl font-semibold text-[#223A5C] mb-2 text-left">
              {title}
            </h3>
            <div className="text-sm text-gray-700 text-left">
              {description}
            </div>
          </div>
        </div>
      ))}
      <MissionPopup 
        isOpen={isMissionPopupOpen} 
        onClose={() => setIsMissionPopupOpen(false)} 
      />
    </section>
  );
};


const OrganizationSection = () => (
  <section className={`${STYLES.sectionPadding} bg-white text-center`}>
    <SectionTitle>Struktur Organisasi</SectionTitle>
    <div className="max-w-4xl mx-auto text-center mb-2">
      <p className="text-[18px] text-[#223A5C] leading-relaxed mb-2 font-bold">
        Balai Teknologi Informasi dan Data Pendidikan
      </p>
      <p className="text-[18px] text-[#223A5C] leading-relaxed mb-2 font-semibold">
        Dinas Pendidikan dan Kebudayaan
      </p>
      <p className="text-[18px] text-[#223A5C] leading-relaxed mb-2 font-semibold">
        Provinsi Nusa Tenggara Barat
      </p>
      <img
        src="/assets/StrukturOrganisasi.jpg"
        alt="Struktur Organisasi"
        className="w-full max-w-[1220px] h-auto mx-auto object-cover"
      />
    </div>
  </section>
);

const Popup = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#223A5C]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <table className="w-full border-collapse border border-[#223A5C]">
          <thead className="bg-[#223A5C] text-white">
            <tr>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Sub Bagian</th>
              <th className="px-4 py-2 border">NIP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className={`text-center ${index === 0 ? 'bg-[#63997F]' : index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                <td className={`px-4 py-2 border ${index === 0 ? 'text-white' : 'text-[#223A5C]'}`}>
                  {item.name}
                </td>
                <td className={`px-4 py-2 border ${index === 0 ? 'text-white' : 'text-[#223A5C]'}`}>
                  {item.subDepartment}
                </td>
                <td className={`px-4 py-2 border ${index === 0 ? 'text-white' : 'text-[#223A5C]'}`}>
                  {item.nip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrganizationTable = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [popupTitle, setPopupTitle] = useState("");
  const [uniquePositionMembers, setUniquePositionMembers] = useState([]);
  const [departmentStaff, setDepartmentStaff] = useState({});

  const positionOrder = [
    "Kepala Balai",
    "Fungsional PTP",
    "Fungsional Prakom",
    "Kasubbag Tata Usaha",
    "Kasi Pemanfaatan TI dan Pengelolaan DP",
    "Kasi Pengembangan Media Belajar"
  ];

  const formatActiveYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year === currentYear ? `${year}` : `${year} - Sekarang`;
  };

  useEffect(() => {
    // Fetch main table data
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/organization-members');
        // Get only one member per position (the first one)
        const uniqueMembers = Object.values(
          response.data.reduce((acc, member) => {
            if (!acc[member.position]) {
              acc[member.position] = member;
            }
            return acc;
          }, {})
        );

        // Sort members according to positionOrder
        const sortedMembers = uniqueMembers.sort((a, b) => {
          const indexA = positionOrder.indexOf(a.position);
          const indexB = positionOrder.indexOf(b.position);
          // If position is not in the order array, put it at the end
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });

        setUniquePositionMembers(sortedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    // Fetch department staff data
    const fetchDepartmentStaff = async () => {
      try {
        const response = await axios.get('/api/department-staff');
        // Sort staff in each department according to positionOrder if needed
        const sortedStaff = Object.fromEntries(
          Object.entries(response.data).map(([key, staff]) => [
            key,
            staff.sort((a, b) => {
              const indexA = positionOrder.indexOf(a.subDepartment);
              const indexB = positionOrder.indexOf(b.subDepartment);
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;
              return indexA - indexB;
            })
          ])
        );
        setDepartmentStaff(sortedStaff);
      } catch (error) {
        console.error('Error fetching department staff:', error);
      }
    };

    fetchMembers();
    fetchDepartmentStaff();
  }, []);

  const handleClick = (position) => {
    setPopupData(departmentStaff[position] || []);
    setPopupTitle(position);
    setIsPopupOpen(true);
  };

  return (
    <section className="px-14 py-2 mb-16 bg-white">
      <div className="overflow-x-auto mx-auto" style={{ maxWidth: "calc(100% - 40px)" }}>
        <table className="table-auto w-full border border-[#223A5C]">
          <thead className="bg-[#223A5C] text-white">
            <tr>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Jabatan</th>
              <th className="px-4 py-2 border">NIP</th>
              <th className="px-4 py-2 border">Tahun Aktif</th>
            </tr>
          </thead>
          <tbody>
            {uniquePositionMembers.map((member, index) => (
              <tr key={index} className="text-center odd:bg-white even:bg-gray-100">
                <td 
                  className="px-4 py-2 border text-[#223A5C] cursor-pointer hover:text-blue-600"
                  onClick={() => handleClick(member.position)}
                >
                  {member.name}
                </td>
                <td 
                  className="px-4 py-2 border text-[#223A5C] cursor-pointer hover:text-blue-600"
                  onClick={() => handleClick(member.position)}
                >
                  {member.position}
                </td>
                <td className="px-4 py-2 border text-[#223A5C]">{member.nip}</td>
                <td className="px-4 py-2 border text-[#223A5C]">
                  {formatActiveYear(member.activeYear)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
        data={popupData}
      />
    </section>
  );
};

const TentangKami = ({ auth }) => {
  return (
    <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar auth={auth} />
      </header>

      <main>
        <HeroSection />
        <AboutSection />
        <WelcomeSection/>
        <VisionMissionSection />
        <OrganizationSection />
        <OrganizationTable />
      </main>

      <Footer />
    </div>
  );
};

export default TentangKami;