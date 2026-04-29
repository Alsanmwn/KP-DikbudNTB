import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function RiwayatPendaftaran({ data }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        Riwayat Pendaftaran Kegiatan
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Daftar semua kegiatan yang telah Anda daftarkan.
                    </p>
                </div>

                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    {data.length} kegiatan
                </span>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-sm">Belum ada pendaftaran kegiatan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.map((item) => {
                        const kegiatan = item.kegiatan ?? {};

                        return (
                            <div
                                key={item.id}
                                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow h-full flex flex-col"
                            >
                                {/* Gambar */}
                                {kegiatan.gambar ? (
                                    <img
                                        src={`/storage/${kegiatan.gambar}`}
                                        alt={kegiatan.nama}
                                        className="w-full aspect-[16/9] object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-36 flex items-center justify-center text-white text-xl font-bold"
                                        style={{
                                            background:
                                                'linear-gradient(135deg,#1a3a6b,#4a6fa5)',
                                        }}
                                    >
                                        {(kegiatan.nama ?? 'K')
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}

                                <div className="p-3 flex flex-col flex-1">
                                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                                        {kegiatan.nama ?? '—'}
                                    </p>

                                    {kegiatan.deskripsi && (
                                        <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                                            {kegiatan.deskripsi}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                                        {kegiatan.tanggal && (
                                            <div className="flex items-center gap-1">
                                                <span>📅</span>
                                                <span>
                                                    {new Date(
                                                        kegiatan.tanggal
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {kegiatan.waktu && (
                                            <div className="flex items-center gap-1">
                                                <span>🕐</span>
                                                <span>{kegiatan.waktu}</span>
                                            </div>
                                        )}

                                        {kegiatan.lokasi && (
                                            <div className="flex items-center gap-1">
                                                <span>📍</span>
                                                <span className="truncate">
                                                    {kegiatan.lokasi}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tombol Batalkan */}
                                    <button
                                        onClick={() => {
                                            setSelectedId(item.id);
                                            setShowConfirm(true);
                                        }}
                                        className="mt-3 text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"
                                    >
                                        Batalkan
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Konfirmasi */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center animate-fadeIn">
                        <div className="text-4xl mb-3">⚠️</div>
                        <h2 className="text-lg font-bold text-red-600 mb-2">
                            Batalkan Pendaftaran?
                        </h2>
                        <p className="text-sm text-gray-500 mb-5">
                            Data yang dibatalkan tidak bisa dikembalikan lagi.
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                                Tidak
                            </button>

                            <button
                                onClick={() => {
                                    router.delete(
                                        route('pendaftaran.destroy', selectedId),
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                setShowConfirm(false);
                                                router.reload();
                                            },
                                        }
                                    );
                                }}
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 "
                            >
                                Ya, Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}