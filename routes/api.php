<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PendaftaranKegiatanController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\PegawaiJabatanController;
use App\Http\Controllers\PermohonanLayananController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Route::apiResource('kegiatans', KegiatanController::class);


Route::apiResource('kegiatan', KegiatanController::class);


Route::post('/api/kegiatan', [KegiatanController::class, 'store']); // Untuk menambah kegiatan
Route::post('/api/kegiatan/{id}', [KegiatanController::class, 'update']); // Untuk memperbarui kegiatan
Route::get('/kegiatan/{id}', [KegiatanController::class, 'show']);

Route::get('/users', function () {
    return response()->json(User::all());
});

Route::get('/users', [UserController::class, 'index']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

Route::post('/pendaftaran-kegiatan', [PendaftaranKegiatanController::class, 'store']);

Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
    // User Management API
    Route::apiResource('users', UserController::class);
    
    // Kegiatan API
    Route::apiResource('kegiatan', KegiatanController::class);
    
    // Pendaftaran API
    Route::post('pendaftaran-kegiatan', [PendaftaranKegiatanController::class, 'store']);
});

Route::get('/kegiatan/{kegiatan}/pendaftar', [KegiatanController::class, 'getPendaftar']);

Route::get('/struktur-organisasi', [PegawaiJabatanController::class, 'index']);
Route::post('/struktur-organisasi', [PegawaiJabatanController::class, 'store']);
Route::put('/struktur-organisasi/{id}', [PegawaiJabatanController::class, 'update']);
Route::delete('/struktur-organisasi/{id}', [PegawaiJabatanController::class, 'destroy']);


Route::get('/organization-members', [PegawaiJabatanController::class, 'getMembers']);
Route::get('/department-staff', [PegawaiJabatanController::class, 'getDepartmentStaff']);

// In your routes/api.php
Route::apiResource('struktur-organisasi', PegawaiJabatanController::class);

// Di routes/api.php, pastikan route API sudah terdaftar:
Route::get('/pegawai', [PegawaiController::class, 'index']);
// Route::get('/jabatan', [JabatanController::class, 'index']);

// Tambahkan route test
Route::get('/test', function() {
    return response()->json(['message' => 'API berfungsi']);
});

// routes/api.php
Route::apiResource('pegawai', PegawaiController::class);
Route::apiResource('jabatan', JabatanController::class);
// Route::apiResource('struktur-organisasi', PegawaiJabatanController::class);

// Route::get('struktur-organisasi-relations', [PegawaiJabatanController::class, 'getRelationalData']);

// Route::delete('/api/jabatan/{id}', 'JabatanController@destroy');

Route::get('/jabatan', [JabatanController::class, 'index']);
Route::post('/jabatan', [JabatanController::class, 'store']);
Route::get('/jabatan/{id}', [JabatanController::class, 'show']);
Route::put('/jabatan/{id}', [JabatanController::class, 'update']);
Route::delete('/jabatan/{id}', [JabatanController::class, 'destroy']);

// Route::prefix('api')->group(function () {
//     Route::get('/pegawai-jabatan', [PegawaiJabatanController::class, 'index']);
//     Route::post('/pegawai-jabatan', [PegawaiJabatanController::class, 'store']);
//     Route::put('/pegawai-jabatan/{id}', [PegawaiJabatanController::class, 'update']);
//     Route::delete('/pegawai-jabatan/{id}', [PegawaiJabatanController::class, 'destroy']);
// });

Route::apiResource('pegawai-jabatan', PegawaiJabatanController::class);

Route::post('/permohonan-layanan', [PermohonanLayananController::class, 'store']);

// Route::get('/api/permohonanlayanans', [PermohonanLayananController::class, 'index']);
Route::get('/permohonan-layanan', [PermohonanLayananController::class, 'index']);
Route::post('/permohonan-layanan', [PermohonanLayananController::class, 'store']);
Route::put('/permohonan-layanan/{id}', [PermohonanLayananController::class, 'update']);
Route::delete('/permohonan-layanan/{id}', [PermohonanLayananController::class, 'destroy']);
