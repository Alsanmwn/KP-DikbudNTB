import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/Components/Footer'; // Import Footer

const AgendaKegiatan = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  const months = [
    { value: 'all', label: 'Semua Bulan' },
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-[#223A5C] text-white shadow-sm flex-shrink-0 h-16 mb-16">
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
                <option value="2023">2023</option>
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
                href={route('beranda')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {/* Your main content here */}
      </div>

      {/* Footer */}
      <Footer className="fixed bottom-0 w-full" />
    </div>
  );
};

export default AgendaKegiatan;
