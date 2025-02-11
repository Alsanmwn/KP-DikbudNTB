import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Constants moved to separate object for better maintainability
const STYLES = {
  title: "text-[25px] font-bold text-[#223A5C] mb-6",
  sectionPadding: "px-4 py-16",
};

// Separate components into their own components
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

const AboutSection = () => (
  <section className={`${STYLES.sectionPadding} bg-white text-center`}>
    <SectionTitle>Tentang Kami</SectionTitle>
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-[18px] text-[#223A5C] leading-relaxed mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae
        eleifend lectus. Duis dignissim nibh porta, sodales nibh ullamcorper,
        cursus nunc.
      </p>
      <hr className="border-t-2 border-[#223A5C] mt-4 mx-auto w-1/5" />
    </div>
  </section>
);

const WelcomeSection = () => (
  <section className="relative mb-32">
    <div className="flex justify-center items-center">
      <img
        src="/assets/sunset.png"
        alt="Sunset view"
        className="w-full max-w-[1220px] h-[350px] object-cover"
      />
    </div>
    <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1000px] bg-white shadow-lg p-6 mt-16">
      <h2 className="text-[#223A5C] text-xl font-semibold mb-1">
        Selamat Datang di Website Kami
      </h2>
      <p className="text-gray-600 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae
        eleifend lectus. Duis dignissim nibh porta, sodales nibh ullamcorper,
        cursus nunc.
      </p>
    </div>
  </section>
);

const VisionMissionSection = () => {
  const items = [
    { title: "Visi", image: "/assets/bunga.png" },
    { title: "Misi", image: "/assets/gunung.png" },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-9 mb-16 relative">
      {items.map(({ title, image }) => (
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
            <p className="text-sm text-gray-700 text-left">
              Deskripsi tentang {title.toLowerCase()}, yang menggambarkan detail
              dan aspek penting.
            </p>
          </div>
        </div>
      ))}
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

// Popup Component
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

  const members = [
    { name: "Alsa Nurmawan, ST MT", position: "Kepala Balai", nip: "D121221087", activeYear: "2023-Sekarang" },
    { name: "Ayu Widya Ningrum, ST MT", position: "Fungsional PTP", nip: "D121221088", activeYear: "2021-Sekarang" },
    { name: "Suci Artiara, ST MT", position: "Fungsional Perkom", nip: "D121221069", activeYear: "2021-Sekarang" },
    { name: "Farah Sabrina, ST MT", position: "Kasubbag Tata Usaha", nip: "D121221089", activeYear: "2020-Sekarang" },
    { name: "Siti Aisyah Raodahtul Jannah, ST", position: "Kasi Pemanfaatan TI & Pengembangan DP", nip: "D121221090", activeYear: "2019-Sekarang" },
    { name: "Aurency Crishtabella Lolo, ST", position: "Kasi Pengembangan MP", nip: "D121221074", activeYear: "2022-Sekarang" },
  ];

  const departmentStaff = {
    "Kepala Balai": [
      { name: "Alsa Nurmawan, ST MT", subDepartment: "Kepala Balai", nip: "D121221087" },
      { name: "Staff 1", subDepartment: "Sekretariat", nip: "D121221091" },
      { name: "Staff 2", subDepartment: "Sekretariat", nip: "D121221092" },
    ],
    "Fungsional PTP": [
      { name: "Ayu Widya Ningrum, ST MT", subDepartment: "Fungsional PTP", nip: "D121221088" },
      { name: "Staff 3", subDepartment: "PTP", nip: "D121221093" },
      { name: "Staff 4", subDepartment: "PTP", nip: "D121221094" },
    ],
    "Fungsional Perkom": [
      { name: "Suci Artiara, ST MT", subDepartment: "Fungsional Perkom", nip: "D121221069" },
    ],
    "Kasubbag Tata Usaha": [
      { name: "Farah Sabrina, ST MT", subDepartment: "Kasubbag Tata Usaha", nip: "D121221089" },
      { name: "Irma Purwati", subDepartment: "Pengolahan Data & Informasi", nip: "D121221097" },
      { name: "M.HArpan Teguh S., S.Kom", subDepartment: "Tenaga Pendukung DI", nip: "D121221097" },
      {name: "Musleha", subDepartment: "Penelaah Teknis Kebijakan", nip: "D121221098" },
      { name: "Mirza Fahlevi, S.Pd", subDepartment: "Tenaga Pendukung Adum", nip: "D121221098" },
      { name: "Rima Rahmanlyah, S.Kom", subDepartment: "Tenaga Pendukung Adum", nip: "D121221098" },
    ],
    "Kasi Pemanfaatan TI & Pengembangan DP": [
      { name: "Siti Aisyah Raodahtul Jannah, ST", subDepartment: "Pemanfaatan TI", nip: "D121221090" },
      { name: "Staff 9", subDepartment: "Pengembangan DP", nip: "D121221099" },
      { name: "Staff 10", subDepartment: "Pengembangan DP", nip: "D121221100" },
      { name: "Staff 10", subDepartment: "Pengembangan DP", nip: "D121221100" },
    ],
    "Kasi Pengembangan MP": [
      { name: "Aurency Crishtabella Lolo, ST", subDepartment: "Pengembangan MP", nip: "D121221074" },
      { name: "Staff 11", subDepartment: "Pengembangan MP", nip: "D121221101" },
      { name: "Staff 12", subDepartment: "Pengembangan MP", nip: "D121221102" },
    ],
  };

  const handleClick = (position) => {
    setPopupData(departmentStaff[position]);
    setPopupTitle(position);
    setIsPopupOpen(true);
  };

  return (
    <section className="px-14 py-2 mb-16">
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
            {members.map((member, index) => (
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
                <td className="px-4 py-2 border text-[#223A5C]">{member.activeYear}</td>
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