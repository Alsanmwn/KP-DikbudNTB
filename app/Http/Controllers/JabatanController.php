<?php

// app/Http/Controllers/JabatanController.php
// namespace App\Http\Controllers;

// use App\Models\Jabatan;
// use Illuminate\Http\Request;
// use Illuminate\Validation\Rule;

// class JabatanController extends Controller
// {
//     public function index()
//     {
//         return response()->json(Jabatan::all());
//     }

//     public function store(Request $request)
//     {
//         $validated = $request->validate([
//             'nama_jabatan' => 'required|string|unique:jabatan,nama_jabatan|max:255',
//         ]);

//         $jabatan = Jabatan::create($validated);
//         return response()->json($jabatan, 201);
//     }

//     public function update(Request $request, Jabatan $jabatan)
//     {
//         $validated = $request->validate([
//             'nama_jabatan' => ['required', 'string', 'max:255', Rule::unique('jabatan')->ignore($jabatan->id)],
//         ]);

//         $jabatan->update($validated);
//         return response()->json($jabatan);
//     }

//     // public function destroy(Jabatan $jabatan)
//     // {
//     //     $jabatan->delete();
//     //     return response()->json(null, 204);
//     // }
//     public function destroy($id)
//     {
//         try {
//             $jabatan = Jabatan::findOrFail($id);
//             $jabatan->delete();
//             return response()->json(['message' => 'Jabatan berhasil dihapus']);
//         } catch (\Exception $e) {
//             return response()->json(['message' => 'Gagal menghapus jabatan'], 500);
//         }
//     }
// }


namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\PegawaiJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JabatanController extends Controller
{
    // Menampilkan semua data jabatan
    public function index()
    {
        try {
            $jabatan = Jabatan::all();
            return response()->json($jabatan);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data jabatan: ' . $e->getMessage()
            ], 500);
        }
    }

    // Menyimpan jabatan baru
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_jabatan' => 'required|string|max:255',
            ]);

            $jabatan = Jabatan::create([
                'nama_jabatan' => $request->nama_jabatan,
            ]);

            return response()->json([
                'message' => 'Jabatan berhasil ditambahkan',
                'data' => $jabatan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan jabatan: ' . $e->getMessage()
            ], 500);
        }
    }

    // Menampilkan detail jabatan
    public function show($id)
    {
        try {
            $jabatan = Jabatan::findOrFail($id);
            return response()->json($jabatan);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Jabatan tidak ditemukan'
            ], 404);
        }
    }

    // Mengupdate jabatan
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'nama_jabatan' => 'required|string|max:255',
            ]);

            $jabatan = Jabatan::findOrFail($id);
            $jabatan->update([
                'nama_jabatan' => $request->nama_jabatan,
            ]);

            return response()->json([
                'message' => 'Jabatan berhasil diupdate',
                'data' => $jabatan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupdate jabatan: ' . $e->getMessage()
            ], 500);
        }
    }

    // Menghapus jabatan
    // public function destroy($id)
    // {
    //     try {
    //         // Cek apakah jabatan masih digunakan di tabel struktur
    //         $strukturCount = PegawaiJabatan::where('jabatan_id', $id)->count();
            
    //         if ($strukturCount > 0) {
    //             return response()->json([
    //                 'message' => 'Tidak dapat menghapus jabatan karena masih digunakan dalam struktur organisasi'
    //             ], 400);
    //         }

    //         DB::beginTransaction();
            
    //         // Hanya menghapus data dari tabel jabatan
    //         $jabatan = Jabatan::findOrFail($id);
    //         $jabatan->delete();
            
    //         DB::commit();
            
    //         return response()->json([
    //             'message' => 'Jabatan berhasil dihapus'
    //         ]);
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return response()->json([
    //             'message' => 'Gagal menghapus jabatan: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }
    // public function destroy($id)
    // {
    //     $jabatan = Jabatan::find($id);
    
    //     // Cek apakah jabatan ada, jika tidak ada tampilkan error
    //     if (!$jabatan) {
    //         return redirect()->back()->with('error', 'Jabatan tidak ditemukan.');
    //     }
    
    //     // Hapus semua relasi dengan pegawai sebelum menghapus jabatan
    //     $jabatan->pegawaiJabatan()->delete();
    
    //     // Hapus jabatan setelah hubungan dengan pegawai dihapus
    //     $jabatan->delete();
    
    //     return redirect()->back()->with('success', 'Jabatan berhasil dihapus.');
    // }
    // public function destroy($id)
    // {
    //     // Temukan jabatan berdasarkan ID
    //     $jabatan = Jabatan::find($id);

    //     // Cek jika jabatan ada
    //     if (!$jabatan) {
    //         return redirect()->back()->with('error', 'Jabatan tidak ditemukan.');
    //     }

    //     // Menghapus hubungan jabatan dengan pegawai, jika ada
    //     $jabatan->pegawai()->detach(); // Menghapus hubungan pegawai yang ada di tabel pivot

    //     // Hapus jabatan
    //     $jabatan->delete();

    //     return redirect()->back()->with('success', 'Jabatan berhasil dihapus.');
    // }

    public function destroy($id)
    {
        // Cek apakah jabatan digunakan dalam struktur
        if (PegawaiJabatan::where('jabatan_id', $id)->exists()) {
            return response()->json(['message' => 'Jabatan tidak dapat dihapus karena masih digunakan.'], 400);
        }

        $jabatan = Jabatan::findOrFail($id);
        $jabatan->delete();

        return response()->json(['message' => 'Jabatan berhasil dihapus.']);
    }
    

}
