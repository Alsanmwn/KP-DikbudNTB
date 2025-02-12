<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PendaftaranKegiatan;
use Illuminate\Support\Facades\Log;

class PendaftaranKegiatanController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Menerima request pendaftaran:', $request->all());

        try {
            $validated = $request->validate([
                'namaLengkap' => 'required|string|max:255',
                'jenisKelamin' => 'required|string',
                'tanggalLahir' => 'required|date',
                'alamat' => 'required|string',
                'nomorHP' => 'required|string',
                'email' => 'required|email',
                'user_id' => 'required',
                'kegiatan_id' => 'required'
            ]);

            Log::info('Data tervalidasi:', $validated);

            // Coba membuat record baru
            $pendaftaran = PendaftaranKegiatan::create([
                'namaLengkap' => $validated['namaLengkap'],
                'jenisKelamin' => $validated['jenisKelamin'],
                'tanggalLahir' => $validated['tanggalLahir'],
                'alamat' => $validated['alamat'],
                'nomorHP' => $validated['nomorHP'],
                'email' => $validated['email'],
                'user_id' => $validated['user_id'],
                'kegiatan_id' => $validated['kegiatan_id'],
            ]);

            Log::info('Pendaftaran berhasil dibuat:', $pendaftaran->toArray());

            return response()->json([
                'message' => 'Pendaftaran berhasil',
                'data' => $pendaftaran
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error:', $e->errors());
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('Error saat menyimpan pendaftaran:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Terjadi kesalahan internal: ' . $e->getMessage()
            ], 500);
        }
    }
}