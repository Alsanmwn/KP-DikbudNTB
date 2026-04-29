import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function RiwayatPermohonan({ data }) {
    const statusStyle = {
        menunggu:  { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: '#fbbf24' },
        diproses:  { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: '#60a5fa' },
        disetujui: { bg: 'bg-purple-100',  text: 'text-purple-700',  dot: '#34d399' },
        ditolak:   { bg: 'bg-red-100',    text: 'text-red-600',    dot: '#f87171' },
        selesai:   { bg: 'bg-green-100',   text: 'text-green-600',   dot: '#dab6fc' },
    };

    const statusIcon = {
        menunggu:  '🕐',
        diproses:  '⚙️',
        disetujui: '👍',
        ditolak:   '❌',
        selesai:   '✅',
    };

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Riwayat Permohonan Layanan</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Daftar semua permohonan layanan yang telah Anda ajukan.
                    </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    {data.length} permohonan
                </span>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-sm">Belum ada permohonan layanan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.map((item) => {
                        const status = item.status ?? 'menunggu';
                        const s = statusStyle[status] ?? statusStyle.menunggu;
                        const icon = statusIcon[status] ?? '🕐';

                        const bisaDibatalkan = status === 'menunggu';

                        // Parse files dari JSON string
                        let parsedFiles = [];
                        try {
                            parsedFiles = JSON.parse(item.files || '[]');
                        } catch {
                            parsedFiles = [];
                        }

                        return (
                            <div
                                key={item.id}
                                className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                            style={{ background: 'linear-gradient(135deg,#1a3a6b,#4a6fa5)' }}
                                        >
                                            {(item.nama ?? '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {item.nama_kegiatan ?? '—'}
                                            </p>
                                            <p className="text-xs text-gray-400">{item.nama} · {item.email}</p>
                                        </div>
                                    </div>

                                    {/* Badge Status */}
                                    <span className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                                        <span>{icon}</span>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </div>

                                {/* Detail */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                                    <div className="flex items-start gap-1.5">
                                        <span>🏫</span>
                                        <span>{item.alamat_sekolah ?? '—'}</span>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <span>📞</span>
                                        <span>{item.kontak ?? '—'}</span>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <span>📋</span>
                                        <span>
                                            {item.keperluan === 'lainnya'
                                                ? item.custom_keperluan ?? 'Lainnya'
                                                : item.keperluan ?? '—'}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <span>🕐</span>
                                        <span>
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day:   '2-digit',
                                                month: 'long',
                                                year:  'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Catatan Admin — tampil jika ada */}
                                {item.catatan_admin && (
                                    <div className={`mt-3 pt-3 border-t border-gray-100 rounded-lg px-3 py-2 text-xs ${s.bg} ${s.text}`}>
                                        <p className="font-semibold mb-0.5">💬 Catatan Admin:</p>
                                        <p className="leading-relaxed">{item.catatan_admin}</p>
                                    </div>
                                )}

                                {/* Files — tampil link per file jika ada */}
                                {parsedFiles.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-50">
                                        <p className="text-xs text-gray-500 font-medium mb-1.5">📎 Lampiran:</p>
                                        <div className="flex flex-col gap-1">
                                            {parsedFiles.map((file, index) => {
                                                const fullUrl = file.startsWith('http') ? file : `/storage/${file}`;
                                                const fileName = file.split('/').pop();
                                                const isPdf = file.toLowerCase().endsWith('.pdf');

                                                return (
                                                    <a
                                                        key={index}
                                                        href={fullUrl}
                                                        onClick={(e) => {
                                                            if (isPdf) {
                                                                e.preventDefault();
                                                                window.open(fullUrl, '_blank', 'noopener,noreferrer');
                                                            }
                                                        }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate"
                                                    >
                                                        {isPdf ? '📄' : '🖼️'} {fileName}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Tombol Batalkan — hanya jika status masih menunggu */}
                                {bisaDibatalkan && (
                                    <button
                                        onClick={() => {
                                            setSelectedId(item.id);
                                            setShowConfirm(true);
                                        }}
                                        className="mt-3 text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"
                                    >
                                        Batalkan
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Konfirmasi Batalkan */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center animate-fadeIn">
                        <div className="text-4xl mb-3">⚠️</div>
                        <h2 className="text-lg font-bold text-red-600 mb-2">
                            Batalkan Permohonan?
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
                                    router.delete(route('permohonan.destroy', selectedId), {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            setShowConfirm(false);
                                            router.reload();
                                        }
                                    });
                                }}
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
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