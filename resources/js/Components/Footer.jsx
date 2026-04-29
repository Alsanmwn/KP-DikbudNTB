import { FaEnvelope, FaPhoneAlt, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#223A5C] text-white py-8 -mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-6">
        
        {/* Section 1: About */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold mb-3">BTIDP</h2>
          <p className="text-sm leading-relaxed text-white/80">
            Balai Teknologi Informasi dan Data Pendidikan (BTIDP) adalah Unit
            Pelaksana Teknis Dinas (UPTD) di bawah Dinas Pendidikan dan
            Kebudayaan Provinsi Nusa Tenggara Barat (NTB).
          </p>
        </div>

        {/* Section 2: Layanan */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Layanan</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Pengajuan Surat</li>
            <li>Data Pendidikan</li>
            <li>Rumah Belajar</li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-white/80">
            
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-sm" />
              <a href="mailto:btidp.dikbud.ntb@gmail.com" className="hover:underline">
                btidp.dikbud.ntb@gmail.com
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-sm" />
              <a href="tel:+6205xxxxxx" className="hover:underline">
                +6205xxxxxx
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaInstagram className="mr-2 text-sm" />
              <a 
                href="https://www.instagram.com/btidpdikbudntb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                @btidpdikbudntb
              </a>
            </li>

            <li className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-2 text-sm" />
              <a
                href="https://www.google.com/maps?q=Jl.+Pendidikan+No.19A,+Gomong,+Kec.+Selaparang,+Kota+Mataram,+Nusa+Tenggara+Bar.+83125"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Dikbud NTB
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-white/20 mt-8"></div>

      {/* Copyright */}
      <div className="text-center text-xs text-white/60 mt-4">
        © {new Date().getFullYear()} BTIDP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;