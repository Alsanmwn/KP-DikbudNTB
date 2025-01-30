<?php


namespace App\Http\Controllers;


use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class KegiatanController extends Controller
{
    // public function index()
    // {
    //     return Kegiatan::latest()->get();
    // }


    // public function index()
    // {
    //     $kegiatan = Kegiatan::all();
    //     return response()->json($kegiatan);
    // }


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
            // Simpan gambar ke folder storage/app/public/kegiatan
            $path = $request->file('gambar')->store('kegiatan', 'public');
            $validated['gambar'] = $path;
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
    
}


