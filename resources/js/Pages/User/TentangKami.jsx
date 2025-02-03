import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Constants moved to separate object for better maintainability
const STYLES = {
  title: "text-[25px] font-bold text-[#223A5C] mb-6",
  card: "flex border-2 border-[#223A5C] overflow-hidden",
  cardImage: "w-24 h-24 object-cover",
  cardText: "text-gray-600 text-sm",
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

const PersonCard = ({ image, name, id, title, className = "" }) => (
  <div className={`${STYLES.card} ${className}`}>
    <img
      src={image || "/assets/logobtidp.jpg"}
      alt={`Photo of ${name}`}
      className={STYLES.cardImage}
    />
    <div className="p-4 text-left flex-grow">
      {title && <h4 className="font-bold text-[#223A5C] text-sm mb-1">{title}</h4>}
      <p className={`${STYLES.cardText} mt-2.5 mb-2`}>{name}</p>
      <p className={STYLES.cardText}>#{id}</p>
    </div>
  </div>
);

const HeroSection = () => (
  <div className="relative flex justify-center items-center flex-1 mb-10">
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
    <section className="flex flex-wrap justify-center gap-9 mb-28 relative">
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

const OrganizationSection = () => {
  const staffMembers = {
    leadership: {
      head: { name: "Siti Nur Anisah", id: "088665535435", title: "Kepala BTIDP" },
      staff: [
        "Aurency Crishtabella Lolo",
        "Nurul Insyira Achmad",
        "Siti Aisyah Raodahtull Jannah",
      ],
    },
    functional: [
      "Suci Artiara",
      "Rafiqa Nurcahyani Ibrahim",
      "Nabila Hamdayani Adama",
    ],
    bottom: [
      { name: "Farah Sabrina", title: "Kepala BTIDP" },
      { name: "Ayu Widya Ningrum", title: "Kepala BTIDP" },
    ],
  };

  return (
    <section className={`${STYLES.sectionPadding} bg-white text-center`}>
      <SectionTitle className="mb-3">STRUKTUR ORGANISASI</SectionTitle>
      <div className="max-w-4xl mx-auto text-center mb-6">
        <p className="text-[18px] text-[#223A5C] leading-relaxed mb-4 font-semibold">
          BALAI PENGEMBANGAN TEKNOLOGI PENDIDIKAN (BPTP)
          <br />
          DINAS PENDIDIKAN DAN KEBUDAYAAN
          <br />
          PROVINSI NUSA TENGGARA BARAT
        </p>
        <hr className="border-t-2 border-[#223A5C] mt-4 mx-auto w-1/5" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {/* Functional Groups */}
        <div className="flex flex-wrap gap-8 justify-center w-full mt-8">
          {/* Left Column - PTP Functional */}
          <div className="flex flex-col gap-8">
            <div className={`${STYLES.card} bg-gray-200 w-[400px]`}>
              <div className="p-4 text-left w-full">
                <h4 className="font-bold text-[#223A5C] text-lg mb-1 text-center">
                  FUNGSIONAL PTP
                </h4>
              </div>
            </div>
            {staffMembers.functional.map((name) => (
              <PersonCard
                key={name}
                name={name}
                id="088665535435"
                className="w-[400px]"
              />
            ))}
          </div>

          {/* Right Column - Leadership */}
          <div className="flex flex-col gap-8">
            <div className="ml-56">
              <PersonCard {...staffMembers.leadership.head} className="w-[400px]" />
            </div>
            {staffMembers.leadership.staff.map((name) => (
              <div key={name} className="ml-80">
                <PersonCard name={name} id="088665535435" className="w-[400px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex gap-8 justify-center mt-24">
          {staffMembers.bottom.map(({ name, title }) => (
            <PersonCard
              key={name}
              name={name}
              id="088665535435"
              title={title}
              className="w-[400px]"
            />
          ))}
        </div>
      </div>
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
        <WelcomeSection />
        <VisionMissionSection />
        <OrganizationSection />
      </main>

      <Footer />
    </div>
  );
};

export default TentangKami;
