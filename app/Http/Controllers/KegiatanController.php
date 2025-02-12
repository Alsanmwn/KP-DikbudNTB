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
                // Pastikan path gambar tidak mengandung 'public/'
                $item->gambar = str_replace('public/', '', $item->gambar);
            }
            return $item;
        });
        return response()->json($kegiatan);
    }    

    public function showDetail($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
       
        // Transform the image URL if needed
        if ($kegiatan->gambar) {
            $kegiatan->gambar = $kegiatan->gambar; // The storage path will be prepended in the frontend
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
            // Delete old image if there's a new one
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

    // Di KegiatanController atau di route lain
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

    // public function daftarKegiatan(Request $request)
    // {
    //     $kegiatan_data = Kegiatan::findOrFail($request->kegiatan_id);
        
    //     return Inertia::render('User/DaftarKegiatan', [ // Sesuaikan dengan path yang benar
    //         'auth' => [
    //             'user' => Auth::user()
    //         ],
    //         'kegiatan_data' => $kegiatan_data
    //     ]);
    // }

    public function daftarKegiatan(Request $request)
    {
        $kegiatan_data = Kegiatan::findOrFail($request->kegiatan_id);
        
        return Inertia::render('User/PendaftaranKegiatan', [ // Sesuaikan dengan path yang benar
            'auth' => [
                'user' => Auth::user()
            ],
            'kegiatan_data' => $kegiatan_data
        ]);
    }

}