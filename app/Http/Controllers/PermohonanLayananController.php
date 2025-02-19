<?php
// app/Http/Controllers/PermohonanLayananController.php
namespace App\Http\Controllers;

use App\Models\PermohonanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PermohonanLayananController extends Controller
{
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
            'nama' => $request->nama,
            'email' => $request->email,
            'alamat_sekolah' => $request->alamatSekolah,
            'nama_kegiatan' => $request->namaKegiatan,
            'keperluan' => $request->keperluan,
            'custom_keperluan' => $request->customKeperluan,
            'kontak' => $request->kontak,
            'files' => json_encode($filesPaths)
        ]);

        return response()->json([
            'message' => 'Permohonan layanan berhasil dikirim!',
            'data' => $permohonan
        ], 201);
    }
}