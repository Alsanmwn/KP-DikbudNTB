import React, { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft, CalendarIcon, MapPinIcon } from "lucide-react";
import Footer from "@/Components/Footer";

const events = [
  {
    image: "/assets/malino2.jpg",
    title: "FORMATIF",
    description: "Analisis Transformasi Dunia Pendidikan: Menggali Potensi Bahasa Penggunaan ChatGPT membahas mengenai pengguanaan AI yang menarik perhatian kalangan sekarang",
    date: "27 September 2025",
    time: "16:00 WITA - Selesai",
    location: "Masjidul Student Center Fakultas Teknik Universitas Hasanuddin",
    status: "Open for Public",
  },
  {
    image: "/assets/malino2.jpg",
    title: "WEBINAR",
    description: "Transformers, generative text, dan prompt engineering memainkan peran penting dalam teknologi AI modern.",
    date: "19 September 2025",
    time: "09:00 - 11:00 WITA",
    location: "Zoom Meeting",
    status: "Open for Public",
  },
  {
    image: "/assets/malino.jpg",
    title: "RAPAT KERJA HMIF FT-UH",
    description: "Dalam rangka pelaksanaan RAPAT KERJA HMIF FT-UH PERIODE 2024-2025",
    date: "16 November 2025",
    time: "15:00 WITA - Selesai",
    location: "Sekretariat OKIF FT-UH",
    status: "Only for HMIF FT-UH",
  },
  {
    image: "/assets/malino.jpg",
    title: "EDUSPEAK FORUM",
    description: "Dalam rangka pelaksanaan RAPAT KERJA HMIF FT-UH PERIODE 2024-2025",
    date: "16 November 2024",
    time: "15:00 WITA - Selesai",
    location: "Sekretariat OKIF FT-UH",
    status: "Only for HMIF FT-UH",
  },
  {
    image: "/assets/malino.jpg",
    title: "Bakar-bakar dirumahnya ayu",
    description: "Kegiatan ini rutin dilakukan setiap tahun untuk mempererat tali persaudaraan Cc",
    date: "16 November 2026",
    time: "15:00 WITA - Selesai",
    location: "Rumah ayu",
    status: "Only for Cc",
  },
  {
    image: "/assets/malino.jpg",
    title: "Bakar-bakar dirumahnya ayu",
    description: "Kegiatan ini rutin dilakukan setiap tahun untuk mempererat tali persaudaraan Cc",
    date: "16 November 2024",
    time: "15:00 WITA - Selesai",
    location: "Rumah ayu",
    status: "Only for Cc",
  },
  {
    image: "/assets/malino.jpg",
    title: "EDUSPEAK FORUM",
    description: "Dalam rangka pelaksanaan RAPAT KERJA HMIF FT-UH PERIODE 2024-2025",
    date: "16 November 2026",
    time: "15:00 WITA - Selesai",
    location: "Sekretariat OKIF FT-UH",
    status: "Only for HMIF FT-UH",
  },
];

const EventCard = ({ event }) => (
    <div className="flex justify-center">
    <div className="flex bg-white rounded-3xl overflow-hidden shadow-lg h-[260px] w-[615px]">
        {/* Image container with fixed width and full height */}
        <div className="w-[200px] h-full flex-shrink-0">
        <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
        />
        </div>
        
        {/* Content container */}
        <div className="flex-1 p-4 flex flex-col space-y-4">
        <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
            {event.title}
            </h2>
            <p className="text-gray-600 text-sm">
            {event.description}
            </p>
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center text-gray-500 text-sm">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>{event.date} • {event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
            </div>
            
            <span
            className={`inline-block px-3 py-1 text-sm rounded-full ${
                event.status === "Open for Public"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-red-100 text-red-600"
            }`}
            >
            {event.status}
            </span>
        </div>
        </div>
    </div>
    </div>
);

const EventsList = ({ filteredEvents }) => {
  if (filteredEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <p className="text-gray-500 text-lg">Kegiatan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {filteredEvents.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

const AgendaKegiatan = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const months = [
    { value: "all", label: "Semua Bulan" },
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  // Filter events based on selected year and month
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventYear = eventDate.getFullYear().toString();
      const eventMonth = (eventDate.getMonth() + 1).toString();

      if (selectedYear !== eventYear) {
        return false;
      }

      if (selectedMonth === "all") {
        return true;
      }

      return eventMonth === selectedMonth;
    });
  }, [selectedYear, selectedMonth]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="w-full bg-[#223A5C] text-white shadow-sm flex-shrink-0 h-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Left side - Title */}
            <div className="h-16 flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white border-b-2 border-white pb-1">
                Agenda Kegiatan
              </h1>
            </div>

            {/* Right side - Filters and Undo button */}
            <div className="flex items-center space-x-4">
              {/* Year Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-32 bg-[#223A5C] text-white"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>

              {/* Month Dropdown */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 bg-[#223A5C] text-white"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              {/* Undo/Back Button */}
              <Link
                href={route("beranda")}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <EventsList filteredEvents={filteredEvents} />
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default AgendaKegiatan;