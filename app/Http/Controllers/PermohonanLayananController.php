<?php

namespace App\Http\Controllers;

use App\Models\PermohonanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PermohonanLayananController extends Controller
{
    public function index()
    {
        return PermohonanLayanan::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email',
            'alamatSekolah' => 'required|string',
            'namaKegiatan' => 'required|string',
            'keperluan' => 'required|string',
            'customKeperluan' => 'nullable|string',
            'kontak' => 'required|string',
            'files.*' => 'nullable|mimes:pdf|max:2048'
        ]);

        $filesPaths = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('permohonan-files', 'public');
                $filesPaths[] = $path;
            }
        }

        $permohonan = PermohonanLayanan::create([
            'user_id' => auth()->id(),
            'nama' => $request->nama,
            'email' => $request->email,
            'alamat_sekolah' => $request->alamatSekolah,
            'nama_kegiatan' => $request->namaKegiatan,
            'keperluan' => $request->keperluan,
            'custom_keperluan' => $request->customKeperluan,
            'kontak' => $request->kontak,
            'files' => json_encode($filesPaths)
            // 'files' => $filesPaths

        ]);

        return response()->json([
            'message' => 'Permohonan layanan berhasil dikirim!',
            'data' => $permohonan
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $permohonan = PermohonanLayanan::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'required',
            'email' => 'required|email',
            'alamat_sekolah' => 'required',
            'nama_kegiatan' => 'required',
            'keperluan' => 'required',
            'custom_keperluan' => 'nullable',
            'kontak' => 'required',
            'files' => 'nullable|json'
        ]);

        $permohonan->update($validated);
        return $permohonan;
    }

// public function destroy($id)
// {
//     $permohonan = PermohonanLayanan::findOrFail($id);

//     if (auth()->check() && $permohonan->user_id !== auth()->id()) {
//         abort(403);
//     }

//     // 🔥 FIX DI SINI
//     $files = $permohonan->files;

//     // kalau string → decode dulu
//     if (is_string($files)) {
//         $files = json_decode($files, true);
//     }

//     if (is_array($files)) {
//         foreach ($files as $filePath) {
//             Storage::disk('public')->delete($filePath);
//         }
//     }

//     $permohonan->delete();

//     return back()->with('success', 'Permohonan berhasil dibatalkan.');
// }

public function destroy($id)
{
    $permohonan = PermohonanLayanan::findOrFail($id);

    // Jika user_id null (data lama), atau tidak cocok → tolak
    if ($permohonan->user_id !== null && $permohonan->user_id !== auth()->id()) {
        abort(403, 'Anda tidak memiliki akses.');
    }

    // Hapus files jika ada
    if (is_array($permohonan->files)) {
        foreach ($permohonan->files as $filePath) {
            Storage::disk('public')->delete($filePath);
        }
    }

    $permohonan->delete();

    return back()->with('success', 'Permohonan berhasil dibatalkan.');
}

public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:menunggu,diproses,disetujui,ditolak,selesai',
        'catatan_admin' => 'nullable|string|max:1000',
    ]);

    $permohonan = PermohonanLayanan::findOrFail($id);
    $permohonan->update([
        'status' => $request->status,
        'catatan_admin' => $request->catatan_admin,
    ]);

    return response()->json($permohonan);
}

}