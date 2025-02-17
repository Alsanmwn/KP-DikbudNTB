import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

const DataPendidikan = () => {
    const [activeTab, setActiveTab] = useState('sekolah');
    const [selectedKabupaten, setSelectedKabupaten] = useState(null);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);

    // Sample data for initial table
    const dataSekolah = [
        {
            kabupaten: 'Kota Mataram',
            sma: { negeri: 10, swasta: 15, total: 25 },
            smk: { negeri: 8, swasta: 12, total: 20 },
            slb: { negeri: 2, swasta: 3, total: 5 }
        }
    ];

    // Kecamatan level data
    const kecamatanDataSekolah = {
        'Kota Mataram': [
            {
                kecamatan: 'Kecamatan Mataram',
                sma: { negeri: 5, swasta: 7, total: 12 },
                smk: { negeri: 4, swasta: 6, total: 10 },
                slb: { negeri: 1, swasta: 2, total: 3 }
            }
        ]
    };

    // School level data
    const schoolListData = {
        'Kecamatan Mataram': [
            {
                nama: 'SMAN 1 Mataram',
                npsn: '50204461',
                bp: 'SMA',
                status: 'Negeri',
                rombel: 32,
                jumlahGuru: 87,
                jumlahPegawai: 15,
                ruangKelas: 32,
                ruangLab: 5,
                ruangPerpustakaan: 1
            },
            {
                nama: 'SMKN 5 Mataram',
                npsn: '50204465',
                bp: 'SMK',
                status: 'Negeri',
                rombel: 28,
                jumlahGuru: 76,
                jumlahPegawai: 12,
                ruangKelas: 28,
                ruangLab: 6,
                ruangPerpustakaan: 1
            }
        ]
    };

    // School details data
    const schoolDetails = {
        'SMAN 1 Mataram': {
            npsn: '50204461',
            status: 'Negeri',
            bentukPendidikan: 'SMA',
            statusKepemilikan: 'Pemerintah Daerah',
            skPendirian: '0281/0/1991',
            tanggalSkPendirian: '1991-05-28',
            skIzinOperasional: '0281/0/1991',
            tanggalSkIzinOperasional: '1991-05-28',
            kebutuhanKhusus: 'B,C1,D,K',
            namaBank: 'BNI',
            cabangKcp: '38 MATARAM',
            rekeningAtasNama: 'SMAN 1 MATARAM'
        },
        'SMKN 5 Mataram': {
            npsn: '50204465',
            status: 'Negeri',
            bentukPendidikan: 'SMK',
            statusKepemilikan: 'Pemerintah Daerah',
            skPendirian: '0283/0/1991',
            tanggalSkPendirian: '1991-05-30',
            skIzinOperasional: '0283/0/1991',
            tanggalSkIzinOperasional: '1991-05-30',
            kebutuhanKhusus: 'B,C1,D,K',
            namaBank: 'BNI',
            cabangKcp: '38 MATARAM',
            rekeningAtasNama: 'SMKN 5 MATARAM'
        }
    };

    const handleKabupatenClick = (kabupaten) => {
        setSelectedKabupaten(kabupaten);
    };

    const handleKecamatanClick = (kecamatan) => {
        setSelectedKecamatan(kecamatan);
    };

    const handleSchoolClick = (school) => {
        setSelectedSchool(school);
    };

    const handleBack = () => {
        if (selectedSchool) {
            setSelectedSchool(null);
        } else if (selectedKecamatan) {
            setSelectedKecamatan(null);
        } else if (selectedKabupaten) {
            setSelectedKabupaten(null);
        }
    };

    const renderSchoolDetails = () => {
        const school = schoolDetails[selectedSchool];
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Identitas Sekolah</h3>
                        <div className="grid gap-2">
                            <div><span className="font-medium">NPSN:</span> {school.npsn}</div>
                            <div><span className="font-medium">Status:</span> {school.status}</div>
                            <div><span className="font-medium">Bentuk Pendidikan:</span> {school.bentukPendidikan}</div>
                            <div><span className="font-medium">Status Kepemilikan:</span> {school.statusKepemilikan}</div>
                            <div><span className="font-medium">SK Pendirian:</span> {school.skPendirian}</div>
                            <div><span className="font-medium">Tanggal SK Pendirian:</span> {school.tanggalSkPendirian}</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Data Pelengkap</h3>
                        <div className="grid gap-2">
                            <div><span className="font-medium">Kebutuhan Khusus Dilayani:</span> {school.kebutuhanKhusus}</div>
                            <div><span className="font-medium">Nama Bank:</span> {school.namaBank}</div>
                            <div><span className="font-medium">Cabang KCP/Unit:</span> {school.cabangKcp}</div>
                            <div><span className="font-medium">Rekening Atas Nama:</span> {school.rekeningAtasNama}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        if (selectedSchool) {
            return renderSchoolDetails();
        }

        if (selectedKecamatan) {
            return (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Nama Sekolah</th>
                                <th className="border px-4 py-2">NPSN</th>
                                <th className="border px-4 py-2">BP</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Rombel</th>
                                <th className="border px-4 py-2">Jumlah Guru</th>
                                <th className="border px-4 py-2">Pegawai</th>
                                <th className="border px-4 py-2">Ruang Kelas</th>
                                <th className="border px-4 py-2">Ruang Lab</th>
                                <th className="border px-4 py-2">Perpustakaan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schoolListData[selectedKecamatan].map((school, index) => (
                                <tr key={index}>
                                    <td 
                                        className="border px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50"
                                        onClick={() => handleSchoolClick(school.nama)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{school.nama}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{school.npsn}</td>
                                    <td className="border px-4 py-2">{school.bp}</td>
                                    <td className="border px-4 py-2">{school.status}</td>
                                    <td className="border px-4 py-2">{school.rombel}</td>
                                    <td className="border px-4 py-2">{school.jumlahGuru}</td>
                                    <td className="border px-4 py-2">{school.jumlahPegawai}</td>
                                    <td className="border px-4 py-2">{school.ruangKelas}</td>
                                    <td className="border px-4 py-2">{school.ruangLab}</td>
                                    <td className="border px-4 py-2">{school.ruangPerpustakaan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedKabupaten) {
            return (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border">
                        <thead>
                            <tr>
                                <th className="border px-6 py-3" rowSpan="2">Kecamatan</th>
                                <th className="border px-6 py-3 text-center" colSpan="3">SMA</th>
                                <th className="border px-6 py-3 text-center" colSpan="3">SMK</th>
                                <th className="border px-6 py-3 text-center" colSpan="3">SLB</th>
                            </tr>
                            <tr>
                                {['Negeri', 'Swasta', 'Total'].map(header => (
                                    <>
                                        <th className="border px-6 py-3">{header}</th>
                                        <th className="border px-6 py-3">{header}</th>
                                        <th className="border px-6 py-3">{header}</th>
                                    </>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {kecamatanDataSekolah[selectedKabupaten].map((item, index) => (
                                <tr key={index}>
                                    <td 
                                        className="border px-6 py-3 text-blue-600 cursor-pointer hover:bg-blue-50"
                                        onClick={() => handleKecamatanClick(item.kecamatan)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{item.kecamatan}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </td>
                                    <td className="border px-6 py-3">{item.sma.negeri}</td>
                                    <td className="border px-6 py-3">{item.sma.swasta}</td>
                                    <td className="border px-6 py-3">{item.sma.total}</td>
                                    <td className="border px-6 py-3">{item.smk.negeri}</td>
                                    <td className="border px-6 py-3">{item.smk.swasta}</td>
                                    <td className="border px-6 py-3">{item.smk.total}</td>
                                    <td className="border px-6 py-3">{item.slb.negeri}</td>
                                    <td className="border px-6 py-3">{item.slb.swasta}</td>
                                    <td className="border px-6 py-3">{item.slb.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border">
                    <thead>
                        <tr>
                            <th className="border px-6 py-3" rowSpan="2">Kabupaten/Kota</th>
                            <th className="border px-6 py-3 text-center" colSpan="3">SMA</th>
                            <th className="border px-6 py-3 text-center" colSpan="3">SMK</th>
                            <th className="border px-6 py-3 text-center" colSpan="3">SLB</th>
                        </tr>
                        <tr>
                            {['Negeri', 'Swasta', 'Total'].map(header => (
                                <>
                                    <th className="border px-6 py-3">{header}</th>
                                    <th className="border px-6 py-3">{header}</th>
                                    <th className="border px-6 py-3">{header}</th>
                                </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSekolah.map((item, index) => (
                            <tr key={index}>
                                <td 
                                    className="border px-6 py-3 text-blue-600 cursor-pointer hover:bg-blue-50"
                                    onClick={() => handleKabupatenClick(item.kabupaten)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.kabupaten}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="border px-6 py-3">{item.sma.negeri}</td>
                                <td className="border px-6 py-3">{item.sma.swasta}</td>
                                <td className="border px-6 py-3">{item.sma.total}</td>
                                <td className="border px-6 py-3">{item.smk.negeri}</td>
                                <td className="border px-6 py-3">{item.smk.swasta}</td>
                                <td className="border px-6 py-3">{item.smk.total}</td>
                                <td className="border px-6 py-3">{item.slb.negeri}</td>
                                <td className="border px-6 py-3">{item.slb.negeri}</td>
                                <td className="border px-6 py-3">{item.slb.swasta}</td>
                                <td className="border px-6 py-3">{item.slb.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const downloadExcel = () => {
        let data;
        if (selectedSchool) {
            data = [schoolDetails[selectedSchool]];
        } else if (selectedKecamatan) {
            data = schoolListData[selectedKecamatan];
        } else if (selectedKabupaten) {
            data = kecamatanDataSekolah[selectedKabupaten];
        } else {
            data = dataSekolah;
        }
        
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Data Sekolah');
        writeFile(workbook, 'data_sekolah.xlsx');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#4A6A99] p-4 flex items-center gap-2">
                        <Link
                            href={route('beranda')}
                            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Informasi Pendidikan</h1>
                    </div>

                    <div className="flex border-b">
                        {[
                            { id: 'sekolah', label: 'Data Sekolah' },
                            { id: 'siswa', label: 'Data Siswa' },
                            { id: 'guru', label: 'Data Guru' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-1 py-4 px-6 text-center transition-colors duration-200
                                    ${activeTab === tab.id 
                                        ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                                        : 'text-gray-600 hover:text-blue-500'
                                    }`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSelectedKabupaten(null);
                                    setSelectedKecamatan(null);
                                    setSelectedSchool(null);
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {(selectedKabupaten || selectedKecamatan || selectedSchool) && (
                            <div className="mb-4">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Kembali</span>
                                </button>
                            </div>
                        )}
                        
                        {renderTable()}

                        <button
                            onClick={downloadExcel}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Unduh Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPendidikan;