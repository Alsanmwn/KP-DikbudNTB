<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminProfileController;

Route::get('/', function () {
    return Inertia::render('User/Beranda', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

Route::get('User/tentang-kami', function () {
    return Inertia::render('User/TentangKami', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('tentang-kami');


Route::get('User/informasi-pendidikan', function () {
    return Inertia::render('User/InformasiPendidikan', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('informasi-pendidikan');

Route::get('User/informasi-kebudayaan', function () {
    return Inertia::render('User/InformasiKebudayaan', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('informasi-kebudayaan');

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('User/pengajuan-surat', function () {
    return Inertia::render('User/PengajuanSurat');
})->name('pengajuan-surat');

Route::get('User/detail-kegiatan', function () {
    return Inertia::render('User/DetailKegiatan'); // Menampilkan halaman 'DetailKegiatan' dari React
})->name('detail-kegiatan');

// routes/web.php
Route::middleware(['auth', 'role:manajemen_dinas'])->group(function () {
    // Route untuk manajemen dinas
});

Route::middleware(['auth', 'role:manajemen_sekolah'])->group(function () {
    // Route untuk manajemen sekolah
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
// Route untuk halaman login dan logout admin
Route::prefix('admin')->group(function () {
    // Middleware untuk guest admin (belum login)
    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminAuthController::class, 'loginForm'])->name('admin.login');
        Route::post('login', [AdminAuthController::class, 'login']);
    });

    // Middleware untuk admin yang sudah login
    Route::middleware('auth:admin')->group(function () {
        // Halaman Dashboard
        Route::get('dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');

        // Halaman untuk route yang mengarah ke React (Inertia)      
        Route::get('/data-pendidikan', function () {
            return Inertia::render('Admin/DataPendidikan', [
                'admin' => Auth::user(),  // Kirim data admin ke Inertia
            ]);
        })->name('admin.data-pendidikan');

        Route::get('/data-pendidikan/siswa', function () {
            return Inertia::render('Admin/Siswa', [
                'admin' => Auth::user(),
            ]);
        })->name('admin.data-pendidikan.siswa');

        Route::get('/data-pendidikan/sekolah', function () {
            return Inertia::render('Admin/Sekolah', [
                'admin' => Auth::user(),
            ]);
        })->name('admin.data-pendidikan.sekolah');

        Route::get('/data-pendidikan/guru', function () {
            return Inertia::render('Admin/Guru', [
                'admin' => Auth::user(),
            ]);
        })->name('admin.data-pendidikan.guru');

        Route::get('/agenda-btidp', function () {
            return Inertia::render('Admin/AgendaBtidp', [
                'admin' => Auth::user(),  // Kirim data admin ke Inertia
            ]);
        })->name('admin.agenda-btidp');        

        // Logout admin
        Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
    });
});

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile');
    Route::patch('/admin/profile-update', [AdminProfileController::class, 'update'])->name('admin.profile.update');

});



require __DIR__.'/auth.php';
