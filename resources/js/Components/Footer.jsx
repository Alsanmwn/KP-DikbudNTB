import { FaEnvelope, FaPhoneAlt, FaInstagram, FaMapMarkerAlt } from "react-icons/fa"; // Import ikon dari react-icons

const Footer = () => {
  return (
    <footer className="bg-[#223A5C] text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 text-center md:text-left px-6">
        {/* Section 1: About */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-6">BTIDP</h2>
          <p className="text-lg leading-relaxed">
            Balai Teknologi Informasi dan Data Pendidikan (BTIDP) adalah Unit Pelaksana Teknis Dinas (UPTD) di bawah
            Dinas Pendidikan dan Kebudayaan Provinsi Nusa Tenggara Barat (NTB).
          </p>
        </div>

        {/* Section 2: Categories (Center aligned in grid, title left-aligned) */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start text-left">
          <h3 className="text-2xl font-semibold mb-6 text-left">Layanan</h3> {/* Rata kiri untuk judul */}
          <ul className="space-y-4 text-lg">
            <li>Pengajuan Surat</li>
            <li>Data Pendidikan</li>
            <li>Rumah Belajar</li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-4 text-xl" />
              <a href="mailto:btidp.dikbud.ntb@gmail.com" className="hover:underline">
                btidp.dikbud.ntb@gmail.com
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-4 text-xl" />
              <a href="tel:+6205xxxxxx" className="hover:underline">
                +6205xxxxxx
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaInstagram className="mr-4 text-xl" />
              <a href="https://www.instagram.com/btidpdikbudntb" target="_blank" rel="noopener noreferrer" className="hover:underline">
                @btidpdikbudntb
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-4 text-xl" />
              <a
                href="https://www.google.com/maps?q=Jl.+Pendidikan+No.19A,+Gomong,+Kec.+Selaparang,+Kota+Mataram,+Nusa+Tenggara+Bar.+83125"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @dikbudntb
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-400 mt-12"></div>
    </footer>
  );    
};

export default Footer;