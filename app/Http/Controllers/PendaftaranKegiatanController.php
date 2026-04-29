<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PendaftaranKegiatan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PendaftaranKegiatanController extends Controller
{
    public function store(Request $request)
    {
        // Ambil user login
        $user = Auth::user();

        // Jika belum login
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // Ambil kegiatan
        $kegiatan = \App\Models\Kegiatan::findOrFail($request->kegiatan_id);

        // Validasi akses role
        if ($kegiatan->tipe === 'anggota' && $user->role !== 'anggota') {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        Log::info('Request masuk:', $request->all());

        try {
            $validated = $request->validate([
                'namaLengkap' => 'required|string|max:255',
                'jenisKelamin' => 'required|string',
                'tanggalLahir' => 'required|date',
                'alamat' => 'required|string',
                'nomorHP' => 'required|string',
                'email' => 'required|email',
                'kegiatan_id' => 'required'
            ]);

            // Simpan ke DB
            $pendaftaran = PendaftaranKegiatan::create([
                'namaLengkap' => $validated['namaLengkap'],
                'jenisKelamin' => $validated['jenisKelamin'],
                'tanggalLahir' => $validated['tanggalLahir'],
                'alamat' => $validated['alamat'],
                'nomorHP' => $validated['nomorHP'],
                'email' => $validated['email'],
                'user_id' => $user->id, // 🔥 dari backend
                'kegiatan_id' => $validated['kegiatan_id'],
            ]);

            return response()->json([
                'message' => 'Pendaftaran berhasil',
                'data' => $pendaftaran
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {

            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {

            Log::error('ERROR:', [
                'message' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan internal'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $data = PendaftaranKegiatan::findOrFail($id);

        // keamanan: pastikan milik user
        if ($data->user_id !== auth()->id()) {
            abort(403);
        }

        $data->delete();

        // return back()->with('success', 'Pendaftaran dibatalkan');
        return redirect()->back()->with('success', 'Pendaftaran dibatalkan');

    }

}
