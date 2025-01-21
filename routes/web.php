<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminAuthController;


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

// Route::middleware('guest:admin')->group(function () {
//     Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
//     Route::post('/admin/login', [AdminAuthController::class, 'login']);
// });

// Route::middleware('auth:admin')->group(function () {
//     Route::get('/admin/dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
//     Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
// });

// Admin routes
Route::prefix('admin')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminAuthController::class, 'loginForm'])->name('admin.login');
        Route::post('login', [AdminAuthController::class, 'login']);
    });

    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
        Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
    });
});



require __DIR__.'/auth.php';
