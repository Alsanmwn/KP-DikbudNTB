import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from 'axios';

const C = {
  navy:    "#1A2E4A",
  teal:    "#2A7F62",
  tealLt:  "#3DAA83",
  offWhite:"#F7F9FC",
  lightBg: "#EEF2F8",
};

const Divider = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#2A7F62]/40" />
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#2A7F62]/40" />
  </div>
);

const SectionLabel = ({ children }) => (
  <span
    className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full"
    style={{ background: `${C.teal}18`, color: C.teal }}
  >
    {children}
  </span>
);

const SectionHeading = ({ label, title, light = false }) => (
  <div className="text-center mb-12">
    <SectionLabel>{label}</SectionLabel>
    <h2
      className="text-3xl md:text-4xl font-bold"
      style={{
        fontFamily: "'Georgia', serif",
        color: light ? "#fff" : C.navy,
        letterSpacing: "-0.02em",
      }}
    >
      {title}
    </h2>
    <Divider className="mt-4 max-w-xs mx-auto" />
  </div>
);


const AboutSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const historyCards = [
    {
      abbr: "BTKP",
      title: "Balai Teknologi Komunikasi Pendidikan",
      body: `Sebelum menjadi Balai Teknologi Komunikasi Pendidikan awalnya bernama Sanggar Teknologi Komunikasi Pendidikan di bawah naungan Pusat Teknologi Komunikasi (Pustekkom). Sekitar tahun 2001 dengan diberlakukannya Otonomi Daerah maka berubah nama menjadi Balai Teknologi Komunikasi Pendidikan (BTKP) sesuai SK Gubernur nomor 484 Tahun 2001.`,
    },
    {
      abbr: "BTIKP",
      title: "Balai Teknologi Informasi dan Komunikasi Pendidikan",
      body: `Seiring perkembangan kelembagaan dan tuntutan Pembentukan Susunan Perangkat Daerah Provinsi NTB, dilakukan perombakan struktur organisasi. Lahirlah Balai Teknologi Informasi dan Komunikasi Pendidikan sesuai Peraturan Gubernur nomor 53 Tahun 2016.`,
    },
    {
      abbr: "BPTP",
      title: "Balai Pengembangan Teknologi Pembelajaran",
      body: `Mengacu pada Permendagri No. 12 Tahun 2017, BTIKP dievaluasi dan berubah nama menjadi Balai Pengembangan Teknologi Pendidikan (BPTeknodik) NTB setelah hasil konsultasi dengan Biro Organisasi Sekretariat Daerah NTB.`,
    },
    {
      abbr: "BTIDP",
      title: "Balai Teknologi Informasi dan Data Pendidikan",
      body: `Mengacu pada perubahan nomenklatur Pusat Teknologi Komunikasi (Pustekkom) menjadi Pusat Data dan Informasi, BPTeknodik berubah menjadi Balai Teknologi Informasi dan Data Pendidikan (BTIDP) tertuang dalam Peraturan Gubernur nomor 29 Tahun 2018.`,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionHeading label="Profil Lembaga" title="Tentang Kami" />
        <p className="text-[#223A5C] text-base leading-relaxed mb-6">
          Balai Teknologi Informasi dan Data Pendidikan dipimpin oleh Kepala Balai
          yang dibantu oleh Kasubbag Tata Usaha, Kepala Seksi Pemanfaatan Teknologi
          Informasi dan Data Pendidikan serta Kepala Seksi Pengembangan Media
          Pembelajaran. Dalam menjalankan tusinya sebagai Unit Pelaksana Teknis
          Dinas Dikbud dibantu juga oleh Fungsional Pengembang Teknologi
          Pembelajaran (PTP) dan Pranata Komputer (Prakom).
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
          style={{ color: C.teal }}
        >
          Lihat Sejarah Kami
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
            style={{ fontFamily: "sans-serif" }}
          >
            <div
              className="flex items-center justify-between px-8 py-5"
              style={{ background: C.navy }}
            >
              <div>
                <p className="text-xs text-white/60 tracking-widest uppercase font-bold">
                  Sejarah Lembaga
                </p>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Georgia',serif" }}>
                  Perjalanan BTIDP
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition text-xl"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {historyCards.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5 flex flex-col gap-2 transition hover:shadow-md"
                  style={{ borderColor: `${C.navyMid}25`, background: C.offWhite }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-black tracking-widest px-2 py-1 rounded"
                      style={{ background: C.navy, color: "#fff" }}
                    >
                      {c.abbr}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: C.navy }}>
                    {c.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-8 py-2.5 rounded-full text-sm font-semibold text-white transition"
                style={{ background: C.teal }}
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
  <section className="relative" style={{ background: C.lightBg }}>
    <div className="relative h-[320px] overflow-hidden">
      <img
        src="/assets/sunset.png"
        alt="Sunset view"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 40%, #EEF2F8 100%)" }}
      />
    </div>
    <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10 pb-20">
      <div
        className="rounded-2xl shadow-xl p-8 md:p-10 border"
        style={{ background: "#fff", borderColor: `${C.navy}12` }}
      >
        <div
          className="w-10 h-1 rounded mb-4"
          style={{ background: C.gold }}
        />
        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: C.navy, fontFamily: "'Georgia',serif" }}
        >
          Selamat Datang di Website Kami
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Website ini menyediakan layanan Pengajuan Surat, Data Pendidikan, dan Rumah Belajar untuk
          mendukung kebutuhan pendidikan. Anda juga dapat melihat agenda BTIDP selama setahun, termasuk
          pelatihan dan seminar. Kami berkomitmen menghadirkan inovasi teknologi demi kemajuan pendidikan.
        </p>
      </div>
    </div>
  </section>
);

const MissionPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const missions = [
    "Meningkatkan akses dan mutu pendidikan dengan mengembangkan media, model dan sistem pembelajaran berbasis teknologi bagi semua jalur, jenis dan jenjang pendidikan.",
    "Mewujudkan peningkatan kompetensi sumber daya manusia dan menciptakan pertumbuhan kapasitas manajemen, serta sarana dan prasarana teknologi Pendidikan bagi tenaga pendidik dan kependidikan di semua jalur, jenis dan jenjang pendidikan.",
    "Meningkatkan pelayanan dan pengelolaan pendidikan dengan mengembangkan sistem informasi dan jaringan pendidikan berbasis teknologi.",
    "Mengembangkan kultur lembaga berbasis kinerja dan kebersamaan.",
    "Membangun jejaring kerja dan kemitraan di bidang teknologi Pendidikan.",
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-8 py-5" style={{ background: C.navy }}>
          <div>
            <p className="text-xs text-white/60 tracking-widest uppercase font-bold">Lembaga</p>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Georgia',serif" }}>
              Misi BTIDP
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition text-xl"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-8 space-y-4">
          {missions.map((mission, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ background: C.teal }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{mission}</p>
            </div>
          ))}
        </div>
        <div className="px-8 pb-6 text-right border-t pt-4">
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-full text-sm font-semibold text-white transition"
            style={{ background: C.teal }}
          >
            Tutup
          </button>
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
      accent: C.teal,
      description:
        "Menjadi suatu lembaga pengembangan, pemanfaatan dan pelayanan Teknologi Pendidikan yang kreatif, inovatif dan mencerdaskan.",
      extra: null,
    },
    {
      title: "Misi",
      image: "/assets/Misi.jpg",
      accent: C.gold,
      description:
        "Meningkatkan akses dan mutu pendidikan dengan mengembangkan media, model dan sistem pembelajaran berbasis...",
      extra: (
        <button
          onClick={() => setIsMissionPopupOpen(true)}
          className="mt-2 text-xs font-bold tracking-wide flex items-center gap-1 transition"
          style={{ color: C.teal }}
        >
          Selengkapnya <span>→</span>
        </button>
      ),
    },
  ];

  return (
    <section className="py-20" style={{ background: C.offWhite }}>
      <SectionHeading label="Identitas" title="Visi & Misi" />
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {items.map(({ title, image, accent, description, extra }) => (
          <div
            key={title}
            className="rounded-2xl overflow-hidden shadow-lg w-full max-w-sm flex flex-col"
            style={{ background: "#fff" }}
          >
            <div className="relative h-52 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 30%, rgba(26,46,74,0.75) 100%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 p-5">
                <div
                  className="w-8 h-1 rounded mb-2"
                  style={{ background: accent }}
                />
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia',serif" }}>
                  {title}
                </h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
              {extra}
            </div>
          </div>
        ))}
      </div>
      <MissionPopup isOpen={isMissionPopupOpen} onClose={() => setIsMissionPopupOpen(false)} />
    </section>
  );
};

const OrganizationSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeading label="Kelembagaan" title="Struktur Organisasi" />
      <div className="text-center mb-6">
        <p className="font-bold text-base" style={{ color: C.navy }}>
          Balai Teknologi Informasi dan Data Pendidikan
        </p>
        <p className="text-sm font-semibold" style={{ color: C.navyMid }}>
          Dinas Pendidikan dan Kebudayaan · Provinsi Nusa Tenggara Barat
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: `${C.navy}15` }}>
        <img
          src="/assets/StrukturOrganisasi.jpg"
          alt="Struktur Organisasi"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
);

const Popup = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-8 py-5" style={{ background: C.navy }}>
          <div>
            <p className="text-xs text-white/60 tracking-widest uppercase font-bold">Detail Personel</p>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Georgia',serif" }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition text-xl"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.teal }}>
                <th className="px-5 py-3 text-white font-semibold text-left">Nama</th>
                <th className="px-5 py-3 text-white font-semibold text-left">Sub Bagian</th>
                <th className="px-5 py-3 text-white font-semibold text-left">NIP</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index === 0 ? "" : ""}
                  style={{
                    background:
                      index === 0
                        ? `${C.teal}18`
                        : index % 2 === 0
                        ? "#fff"
                        : C.offWhite,
                  }}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: index === 0 ? C.teal : C.navy }}>
                    {item.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{item.subDepartment}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{item.nip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-full text-sm font-semibold text-white transition"
            style={{ background: C.teal }}
          >
            Tutup
          </button>
        </div>
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
    "Kasi Pengembangan Media Belajar",
  ];

  const formatActiveYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year === currentYear ? `${year}` : `${year} - Sekarang`;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/organization-members");
        const uniqueMembers = Object.values(
          response.data.reduce((acc, member) => {
            if (!acc[member.position]) acc[member.position] = member;
            return acc;
          }, {})
        );
        const sortedMembers = uniqueMembers.sort((a, b) => {
          const ia = positionOrder.indexOf(a.position);
          const ib = positionOrder.indexOf(b.position);
          if (ia === -1) return 1;
          if (ib === -1) return -1;
          return ia - ib;
        });
        setUniquePositionMembers(sortedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    const fetchDepartmentStaff = async () => {
      try {
        const response = await axios.get("/api/department-staff");
        const sortedStaff = Object.fromEntries(
          Object.entries(response.data).map(([key, staff]) => [
            key,
            staff.sort((a, b) => {
              const ia = positionOrder.indexOf(a.subDepartment);
              const ib = positionOrder.indexOf(b.subDepartment);
              if (ia === -1) return 1;
              if (ib === -1) return -1;
              return ia - ib;
            }),
          ])
        );
        setDepartmentStaff(sortedStaff);
      } catch (error) {
        console.error("Error fetching department staff:", error);
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
    <section className="py-20" style={{ background: C.lightBg }}>
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <SectionHeading label="Personel" title="Daftar Pegawai" />

        <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: `${C.navy}15` }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.navy }}>
                <th className="px-5 py-4 text-white font-semibold text-left">Nama</th>
                <th className="px-5 py-4 text-white font-semibold text-left">Jabatan</th>
                <th className="px-5 py-4 text-white font-semibold text-left">NIP</th>
                <th className="px-5 py-4 text-white font-semibold text-left">Tahun Aktif</th>
              </tr>
            </thead>
            <tbody>
              {uniquePositionMembers.map((member, index) => (
                <tr
                  key={index}
                  className="group transition"
                  style={{ background: index % 2 === 0 ? "#fff" : C.offWhite }}
                >
                  <td
                    className="px-5 py-3.5 font-medium cursor-pointer transition"
                    style={{ color: C.navy }}
                    onClick={() => handleClick(member.position)}
                  >
                    <span className="group-hover:underline" style={{ color: C.teal }}>
                      {member.name}
                    </span>
                  </td>
                  <td
                    className="px-5 py-3.5 cursor-pointer text-gray-600"
                    onClick={() => handleClick(member.position)}
                  >
                    {member.position}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{member.nip}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${C.teal}15`, color: C.teal }}
                    >
                      {formatActiveYear(member.activeYear)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    <div className="min-h-screen flex flex-col" style={{ background: C.offWhite }}>
      <header className="w-full">
        <Navbar auth={auth} />
      </header>

      <main className="flex-1">
        <AboutSection />
        <WelcomeSection />
        <VisionMissionSection />
        <OrganizationSection />
        <OrganizationTable />
      </main>

      <Footer />
    </div>
  );
};

export default TentangKami;