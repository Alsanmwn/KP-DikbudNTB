<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KegiatanController extends Controller
{
    public function index()
    {
        return Kegiatan::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'deskripsi' => 'nullable',
            'tanggal' => 'required|date',
            'waktu' => 'required',
            'lokasi' => 'nullable',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:open for public,open anggota'
        ]);
    
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar')->store('kegiatan', 'public');
            $validated['gambar'] = $gambar;
        }
    
        $kegiatan = Kegiatan::create($validated);
        return response()->json($kegiatan, 201);
    }
    
    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'required',
            'deskripsi' => 'nullable',
            'tanggal' => 'required|date',
            'waktu' => 'required',
            'lokasi' => 'nullable',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:open for public,open anggota'
        ]);
    
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($kegiatan->gambar) {
                Storage::disk('public')->delete($kegiatan->gambar);
            }
            $gambar = $request->file('gambar')->store('kegiatan', 'public');
            $validated['gambar'] = $gambar;
        }
    
        $kegiatan->update($validated);
        return response()->json($kegiatan);
    }

    

    public function destroy(Kegiatan $kegiatan)
    {
        if ($kegiatan->gambar) {
            Storage::disk('public')->delete($kegiatan->gambar);
        }
        
        $kegiatan->delete();
        return response()->json(null, 204);
    }
}