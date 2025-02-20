<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\PegawaiJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JabatanController extends Controller
{
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

    public function destroy($id)
    {
        if (PegawaiJabatan::where('jabatan_id', $id)->exists()) {
            return response()->json(['message' => 'Jabatan tidak dapat dihapus karena masih digunakan.'], 400);
        }

        $jabatan = Jabatan::findOrFail($id);
        $jabatan->delete();

        return response()->json(['message' => 'Jabatan berhasil dihapus.']);
    }
    

}
