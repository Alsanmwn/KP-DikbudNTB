<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
// use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\PendaftaranKegiatanController;

Route::get('/', function () {
    return Inertia::render('User/Beranda', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

Route::get('User/tentang-kami', function () {
    return Inertia::render('User/TentangKami', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('tentang-kami');

Route::get('User/informasi-pendidikan', function () {
    return Inertia::render('User/InformasiPendidikan', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('informasi-pendidikan');

Route::get('User/informasi-kebudayaan', function () {
    return Inertia::render('User/InformasiKebudayaan', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('informasi-kebudayaan');

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('User/permohonan-layanan', function () {
    return Inertia::render('User/PermohonanLayanan');
})->name('permohonan-layanan');

Route::get('User/Beranda/agenda-btidp', function () {
    return Inertia::render('User/Beranda/AgendaBtidp');
})->name('agenda-btidp');

Route::get('User/agenda-kegiatan', function () {
    return Inertia::render('User/AgendaKegiatan');
})->name('agenda-kegiatan');

Route::get('User/data-pendidikan', function () {
    return Inertia::render('User/DataPendidikan');
})->name('data-pendidikan');

Route::get('User/pendaftaran-kegiatan', function () {
    return Inertia::render('User/PendaftaranKegiatan');
})->name('pendaftaran-kegiatan');

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
        Route::get('user', function () {
            return Inertia::render('Admin/User', [
                'admin' => Auth::guard('admin')->user(),
            ]);
        })->name('admin.user');

        Route::get('/struktur-organisasi', function () {
            return Inertia::render('Admin/StrukturOrganisasi', [
                'admin' => Auth::guard('admin')->user(),
            ]);
        })->name('admin.struktur-organisasi');
          
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

        Route::get('/permohonan-layanan', function () {
            return Inertia::render('Admin/PermohonanLayanan', [
                'admin' => Auth::guard('admin')->user(),
            ]);
        })->name('admin.permohonan-layanan-pendidikan');

        Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
    });
});

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile');
    Route::patch('/admin/profile-update', [AdminProfileController::class, 'update'])->name('admin.profile.update');
});

Route::resource('kegiatan', KegiatanController::class);

Route::get('/api/kegiatan', [KegiatanController::class, 'index']);
Route::get('/api/kegiatan/{id}', [KegiatanController::class, 'show']);
Route::get('/User/detail-kegiatan/{id}', [KegiatanController::class, 'show'])->name('detail.kegiatan');

Route::get('/User/detail-kegiatan/{id}', [KegiatanController::class, 'showDetail'])
    ->name('kegiatan.detail');

// Public admin routes
Route::get('/admin/login', [AdminAuthController::class, 'loginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// Protected admin routes
Route::middleware(['admin.auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
   
    // Data Pendidikan routes BELUM ADA
    // Route::prefix('data-pendidikan')->group(function () {
    //     Route::get('/siswa', [DataPendidikanController::class, 'siswa'])->name('admin.data-pendidikan.siswa');
    //     Route::get('/guru', [DataPendidikanController::class, 'guru'])->name('admin.data-pendidikan.guru');
    //     Route::get('/sekolah', [DataPendidikanController::class, 'sekolah'])->name('admin.data-pendidikan.sekolah');
    // });
   
    // Agenda BTIDP route
    // Route::get('/agenda-btidp', [KegiatanController::class, 'index'])->name('admin.agenda-btidp');
    Route::get('/agenda-btidp', function () {
        return Inertia::render('Admin/AgendaBtidp', [
            'admin' => Auth::user(),  // Kirim data admin ke Inertia
        ]);
    })->name('admin.agenda-btidp');  
   
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

Route::get('/pendaftaran-kegiatan', [KegiatanController::class, 'daftarKegiatan'])
    ->name('pendaftaran-kegiatan')
    ->middleware(['auth']); // Tambahkan middleware auth jika diperlukan

Route::get('/pendaftaran-kegiatan', [KegiatanController::class, 'daftarKegiatan'])->name('pendaftaran-kegiatan');

Route::get('storage/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);
    
    if (!File::exists($path)) {
        abort(404);
    }
    
    return Response::file($path);
})->where('filename', '.*');

require __DIR__.'/auth.php';