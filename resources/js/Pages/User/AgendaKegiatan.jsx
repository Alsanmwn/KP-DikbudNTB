import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft, CalendarIcon, MapPinIcon, EyeIcon } from "lucide-react";
import Footer from "@/Components/Footer";
import axios from 'axios';

const EventCard = ({ event }) => {
  const eventDate = new Date(event.tanggal);
  const today = new Date();
  const isEventPassed = eventDate < today; // Menandakan apakah kegiatan sudah lewat
  const oneDayBeforeEvent = new Date(eventDate);
  oneDayBeforeEvent.setDate(eventDate.getDate() - 1); // Mengurangi satu hari dari tanggal kegiatan

  const isRegistrationClosed = today >= oneDayBeforeEvent; // Mengecek apakah pendaftaran sudah ditutup

  // Menambahkan pengecekan apakah dua jam sudah berlalu setelah kegiatan berlangsung
  const isEventCompleted = today >= new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // Dua jam setelah event

  return (
    <div className="flex justify-center">
      <div className="flex bg-white rounded-3xl overflow-hidden shadow-lg h-[260px] w-[615px]">
        <div className="w-[200px] h-full flex-shrink-0">
          <img
            src={event.gambar ? `/storage/${event.gambar}` : '/assets/default-image.jpg'}
            alt={event.nama}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {event.nama}
            </h2>
            <p className="text-gray-600 text-sm">
              {event.deskripsi}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>
                {new Date(event.tanggal).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} • {event.waktu.slice(0, 5)} WITA
              </span>
            </div>

            <div className="flex items-center text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{event.lokasi}</span>
            </div>

            <div className="flex items-center space-x-2">
              {isRegistrationClosed ? (
                <span
                  className="inline-block px-3 py-1 text-sm rounded-full bg-gray-300 text-gray-600"
                >
                  Closed
                </span>
              ) : (
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${event.status === "open for public" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
                >
                  {event.status === "open for public" ? "Open for Public" : "Open Anggota"}
                </span>
              )}

              {/* Kotak Telah Terlaksana muncul 2 jam setelah kegiatan */}
              {isEventCompleted && (
                <span
                  className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600"
                >
                  Telah Terlaksana
                </span>
              )}

              {/* Hapus tombol "Lihat Detail" jika kegiatan sudah lewat */}
              {!isEventPassed && !isRegistrationClosed && (
                <Link
                  href={route('kegiatan.detail', { id: event.id })}
                  className="inline-flex items-center px-3 py-1 bg-[#223A5C] text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                >
                  Lihat Detail
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




// Rest of the code remains the same as in the original file
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
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

const AgendaKegiatan = () => {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/kegiatan');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

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

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.tanggal);
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full bg-[#223A5C] text-white shadow-sm flex-shrink-0 h-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            <div className="h-16 flex items-center space-x-4">
                <Link
                    href={route("beranda")}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <h1 className="text-xl font-semibold text-white border-b-2 border-white pb-1">
                    Agenda Kegiatan
                </h1>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-32 bg-[#223A5C] text-white"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>

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
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <EventsList filteredEvents={filteredEvents} />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default AgendaKegiatan;