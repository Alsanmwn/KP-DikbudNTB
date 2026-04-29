<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\PendaftaranKegiatan;
// use App\Models\PermohonanLayanan;
// use Carbon\Carbon;

// class DashboardController extends Controller
// {
//     public function index()
//     {
//         // Total Pendaftar Event
//         $totalPendaftarEvent = PendaftaranKegiatan::count();

//         // Total Permohonan
//         $totalPermohonan = PermohonanLayanan::count();

//         // Permohonan Selesai
//         $permohonanSelesai = PermohonanLayanan::where('status', 'selesai')->count();

//         // Status Permohonan
//         $statusPermohonan = [
//             'disetujui' => PermohonanLayanan::where('status', 'disetujui')->count(),
//             'diproses'  => PermohonanLayanan::where('status', 'diproses')->count(),
//             'ditolak'   => PermohonanLayanan::where('status', 'ditolak')->count(),
//             'menunggu'  => PermohonanLayanan::where('status', 'menunggu')->count(),
//         ];

//         // Trafik Permohonan 7 hari terakhir
//         $trafik = collect();

//         for ($i = 6; $i >= 0; $i--) {
//             $date = Carbon::now()->subDays($i);

//             $masuk = PermohonanLayanan::whereDate('created_at', $date)->count();
//             $selesai = PermohonanLayanan::where('status', 'selesai')
//                 ->whereDate('updated_at', $date)
//                 ->count();

//             $trafik->push([
//                 'day' => $date->translatedFormat('D'),
//                 'masuk' => $masuk,
//                 'keluar' => $selesai,
//             ]);
//         }

//         return inertia('Admin/Dashboard', [
//             'dashboardData' => [
//                 'totalPendaftarEvent' => $totalPendaftarEvent,
//                 'totalPermohonan' => $totalPermohonan,
//                 'permohonanSelesai' => $permohonanSelesai,
//                 'statusPermohonan' => $statusPermohonan,
//                 'trafik' => $trafik,
//             ]
//         ]);
//     }
// }

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Inertia\Inertia;
// use App\Models\PermohonanLayanan;
// use App\Models\PendaftaranEvent;
// use App\Models\User;
// use Carbon\Carbon;

// class DashboardController extends Controller
// {
//     public function adminDashboard()
//     {
//         // ───────── SUMMARY DATA ─────────
//         $totalPendaftarEvent = PendaftaranEvent::count();
//         $eventSelesai = PendaftaranEvent::where('status', 'selesai')->count();

//         $totalPermohonan = PermohonanLayanan::count();
//         $permohonanSelesai = PermohonanLayanan::where('status', 'selesai')->count();

//         // ───────── STATUS PERMOHONAN ─────────
//         $permohonanStatus = [
//             [
//                 'label' => 'Disetujui',
//                 'value' => PermohonanLayanan::where('status', 'disetujui')->count(),
//                 'color' => '#34d399',
//                 'icon' => 'CheckCircle',
//             ],
//             [
//                 'label' => 'Diproses',
//                 'value' => PermohonanLayanan::where('status', 'diproses')->count(),
//                 'color' => '#60a5fa',
//                 'icon' => 'Clock',
//             ],
//             [
//                 'label' => 'Ditolak',
//                 'value' => PermohonanLayanan::where('status', 'ditolak')->count(),
//                 'color' => '#f87171',
//                 'icon' => 'AlertCircle',
//             ],
//             [
//                 'label' => 'Menunggu',
//                 'value' => PermohonanLayanan::where('status', 'menunggu')->count(),
//                 'color' => '#fbbf24',
//                 'icon' => 'Bell',
//             ],
//         ];

//         $totalStatus = collect($permohonanStatus)->sum('value');

//         foreach ($permohonanStatus as &$item) {
//             $item['percent'] = $totalStatus > 0
//                 ? round(($item['value'] / $totalStatus) * 100)
//                 : 0;
//         }

//         // ───────── TRAFFIC 7 HARI ─────────
//         $trafficData = [];

//         for ($i = 6; $i >= 0; $i--) {
//             $date = Carbon::now()->subDays($i);

//             $trafficData[] = [
//                 'day' => $date->translatedFormat('D'),
//                 'masuk' => PermohonanLayanan::whereDate('created_at', $date)->count(),
//                 'keluar' => PermohonanLayanan::whereDate('updated_at', $date)
//                     ->where('status', 'selesai')
//                     ->count(),
//             ];
//         }

//         // ───────── RECENT USERS ─────────
//         $recentUsers = User::latest()->take(5)->get()->map(function ($u) {
//             return [
//                 'name' => $u->name,
//                 'email' => $u->email,
//                 'role' => $u->role ?? 'User',
//                 'status' => $u->status ?? 'Aktif',
//                 'avatar' => strtoupper(substr($u->name, 0, 2)),
//             ];
//         });

//         return Inertia::render('Admin/Dashboard', [
//             'admin' => auth()->user(),

//             // SUMMARY (langsung masuk ke UI kamu)
//             'summaryData' => [
//                 [
//                     'icon' => 'FileText',
//                     'title' => 'Total Pendaftar Event',
//                     'value' => $totalPendaftarEvent,
//                     'sub' => '+3 minggu ini',
//                     'color' => '#a78bfa',
//                 ],
//                 [
//                     'icon' => 'CheckCircle',
//                     'title' => 'Event Selesai',
//                     'value' => $eventSelesai,
//                     'sub' => 'progress',
//                     'color' => '#fbbf24',
//                 ],
//                 [
//                     'icon' => 'FileText',
//                     'title' => 'Total Permohonan',
//                     'value' => $totalPermohonan,
//                     'sub' => '+12 hari ini',
//                     'color' => '#60a5fa',
//                 ],
//                 [
//                     'icon' => 'CheckCircle',
//                     'title' => 'Permohonan Selesai',
//                     'value' => $permohonanSelesai,
//                     'sub' => 'progress',
//                     'color' => '#34d399',
//                 ],
//             ],

//             'permohonanStatus' => $permohonanStatus,
//             'trafficData' => $trafficData,
//             'recentUsers' => $recentUsers,
//         ]);
//     }
// }

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\PendaftaranKegiatan;
use App\Models\PermohonanLayanan;
use App\Models\User;
use App\Models\Admin;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            abort(403);
        }

        // ─── TOTAL PENDAFTAR EVENT ─────────────────────
        $totalPendaftar = PendaftaranKegiatan::count();

        // ─── TOTAL PERMOHONAN ──────────────────────────
        $totalPermohonan = PermohonanLayanan::count();

        // ─── PERMOHONAN SELESAI ────────────────────────
        $permohonanSelesai = PermohonanLayanan::where('status', 'selesai')->count();

        // ─── STATUS PERMOHONAN ─────────────────────────
        $statusPermohonan = [
            'disetujui' => PermohonanLayanan::where('status', 'disetujui')->count(),
            'diproses'  => PermohonanLayanan::where('status', 'diproses')->count(),
            'ditolak'   => PermohonanLayanan::where('status', 'ditolak')->count(),
            'menunggu'  => PermohonanLayanan::where('status', 'menunggu')->count(),
        ];

        // ─── TRAFIK 7 HARI TERAKHIR ────────────────────
        $traffic = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);

            $masuk = PermohonanLayanan::whereDate('created_at', $date)->count();
            $keluar = PermohonanLayanan::whereDate('updated_at', $date)
                ->where('status', 'selesai')
                ->count();

            $traffic[] = [
                'day' => $date->translatedFormat('D'),
                'masuk' => $masuk,
                'keluar' => $keluar,
            ];
        }

        // ─── STATISTIK AKTIVITAS (REAL DATA TANPA BULAN) ─────────────
        $statistikAktivitas = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);

            $permohonan = PermohonanLayanan::whereDate('created_at', $date)->count();
            $event = PendaftaranKegiatan::whereDate('created_at', $date)->count();

            $statistikAktivitas[] = [
                'label' => $date->translatedFormat('D'), // Sen, Sel, Rab
                'permohonan' => $permohonan,
                'event' => $event,
            ];
        }

        // ─── DATA USERS + ADMINS ─────────────────────────
        $users = User::select('name', 'email', 'role')->get();

        $admins = Admin::select('name', 'email')
            ->get()
            ->map(function ($admin) {
                return [
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'role' => 'admin',
                ];
            });

        // Gabungkan
        $allUsers = $users->concat($admins);

        // return inertia('Admin/Dashboard', [
        //     'auth' => [
        //         'user' => $admin, 
        //     ],
        //     'stats' => [
        //         'totalPendaftar' => $totalPendaftar,
        //         'totalPermohonan' => $totalPermohonan,
        //         'permohonanSelesai' => $permohonanSelesai,
        //         'statusPermohonan' => $statusPermohonan,
        //         'traffic' => $traffic,
        //     ]
        // ]);
        return inertia('Admin/Dashboard', [
            'auth' => [
                'user' => $admin, 
            ],
            'stats' => [
                'totalPendaftar' => $totalPendaftar,
                'totalPermohonan' => $totalPermohonan,
                'permohonanSelesai' => $permohonanSelesai,
                'statusPermohonan' => $statusPermohonan,
                'traffic' => $traffic,
                'statistikAktivitas' => $statistikAktivitas,
            ],
            'users' => $allUsers, // ⬅️ TAMBAHAN INI
        ]);
    }
}