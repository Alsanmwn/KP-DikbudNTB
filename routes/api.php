<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PendaftaranKegiatanController;
use App\Http\Controllers\OrganizationController;

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

Route::get('/organization-members', [OrganizationController::class, 'getMembers']);
Route::get('/department-staff', [OrganizationController::class, 'getDepartmentStaff']);





