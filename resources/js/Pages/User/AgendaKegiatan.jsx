import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from 'axios';

const EventCard = ({ event }) => {
  const eventDate = new Date(event.tanggal);
  const today = new Date();
  const isEventPassed = eventDate < today;

  const oneDayBeforeEvent = new Date(eventDate);
  oneDayBeforeEvent.setDate(eventDate.getDate() - 1);
  const isRegistrationClosed = today >= oneDayBeforeEvent;

  const isEventCompleted = today >= new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row h-auto sm:h-[200px] md:h-[220px] lg:h-[240px] w-full">
      <div className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] h-48 sm:h-full flex-shrink-0">
        <img
          src={event.gambar ? `/storage/${event.gambar}` : '/assets/default-image.jpg'}
          alt={event.nama}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-2 min-w-0">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
            {event.nama}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
            {event.deskripsi}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start text-gray-500 text-xs sm:text-sm gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
            <span className="leading-tight">
              {new Date(event.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })} • {event.waktu.slice(0, 5)} WITA
            </span>
          </div>

          <div className="flex items-start text-gray-500 text-xs sm:text-sm gap-1.5">
            <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{event.lokasi}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {isRegistrationClosed ? (
              <span className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-gray-200 text-gray-600">
                Closed
              </span>
            ) : (
              <span
                className={`inline-block px-2.5 py-0.5 text-xs rounded-full ${
                  event.status === "open for public"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {event.status === "open for public" ? "Open for Public" : "Open for Anggota"}
              </span>
            )}

            {isEventCompleted && (
              <span className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                Telah Terlaksana
              </span>
            )}

            {!isEventPassed && !isRegistrationClosed && (
              <Link
                href={route('kegiatan.detail', { id: event.id })}
                className="inline-flex items-center px-2.5 py-0.5 bg-[#223A5C] text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
              >
                Lihat Detail
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsList = ({ filteredEvents }) => {
  if (filteredEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <p className="text-gray-500 text-base">Kegiatan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6">
      {filteredEvents.map((event) => (
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
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
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

    if (selectedYear !== eventYear) return false;
    if (selectedMonth === "all") return true;

    return eventMonth === selectedMonth;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#223A5C] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Memuat kegiatan...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col mt-20">
        <div className="w-full text-white flex-shrink-0">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-2 h-14 sm:h-16">
              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-[72px] sm:w-[100px] px-2 sm:px-3 py-1.5 border border-white/30 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-white bg-[#1a2e4a] text-white cursor-pointer"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-[100px] sm:w-[150px] px-2 sm:px-3 py-1.5 border border-white/30 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-white bg-[#1a2e4a] text-white cursor-pointer"
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

        {/* Daftar Event */}
        <div className="flex-1 max-w-7xl w-full mx-auto mb-20">
          <EventsList filteredEvents={filteredEvents} />
        </div>

        <Footer className="mt-auto" />
      </div>
    </>
  );
};

export default AgendaKegiatan;
