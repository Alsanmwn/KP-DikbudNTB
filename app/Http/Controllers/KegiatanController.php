<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index()
    {
        $kegiatan = Kegiatan::all()->map(function ($item) {
            if ($item->gambar) {
                $item->gambar = str_replace('public/', '', $item->gambar);
            }
            return $item;
        });
        return response()->json($kegiatan);
    }    

    public function showDetail($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
       
        if ($kegiatan->gambar) {
            $kegiatan->gambar = $kegiatan->gambar; 
        }
       
        return Inertia::render('User/DetailKegiatan', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'required|string',
            'lokasi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'status' => 'required|string',
            'link_pendaftaran' => 'nullable|url',
            'link_kegiatan' => 'nullable|url',
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('kegiatan', 'public');
        }

        $kegiatan = Kegiatan::create($data);
        return response()->json($kegiatan, 201);
    }

    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'required|string',
            'lokasi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'status' => 'required|string',
            'link_pendaftaran' => 'nullable|string',
            'link_kegiatan' => 'nullable|string',
        ]);

        if ($request->hasFile('gambar')) {
            if ($kegiatan->gambar) {
                Storage::disk('public')->delete($kegiatan->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('kegiatan', 'public');
        }

        $kegiatan->update($data);
        return response()->json($kegiatan, 200);
    }

    public function destroy(Kegiatan $kegiatan)
    {
        if ($kegiatan->gambar) {
            Storage::disk('public')->delete($kegiatan->gambar);
        }
       
        $kegiatan->delete();
        return response()->json(null, 204);
    }

    public function checkImagePaths()
    {
        $kegiatan = Kegiatan::all();
        foreach($kegiatan as $k) {
            echo "ID: " . $k->id . "\n";
            echo "Gambar path: " . $k->gambar . "\n";
            echo "File exists: " . (file_exists(storage_path('app/public/' . $k->gambar)) ? 'Yes' : 'No') . "\n";
            echo "-------------------\n";
        }
    }

    public function showDaftarKegiatan(Request $request)
    {
        return Inertia::render('PendaftaranKegiatan', [
            'auth' => [
                'user' => $request->user(),
            ],
            'kegiatan_data' => [
                'id' => $request->kegiatan_id,
                'nama' => $request->nama_kegiatan
            ]
        ]);
    }

    public function daftarKegiatan(Request $request)
    {
        $kegiatan_data = Kegiatan::findOrFail($request->kegiatan_id);
        
        return Inertia::render('User/PendaftaranKegiatan', [ 
            'auth' => [
                'user' => Auth::user()
            ],
            'kegiatan_data' => $kegiatan_data
        ]);
    }

    public function getPendaftar(Kegiatan $kegiatan)
    {
        \Log::info('Fetching registrants for kegiatan: ' . $kegiatan->id);
        $pendaftar = $kegiatan->pendaftaran()->get(); 
        \Log::info('Found pendaftar:', $pendaftar->toArray());
        
        return $pendaftar;
    }

}