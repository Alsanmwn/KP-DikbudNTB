<?php
// app/Http/Controllers/PegawaiController.php
namespace App\Http\Controllers;

use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PegawaiController extends Controller
{
    // public function index()
    // {
    //     return response()->json(Pegawai::all());
    // }
    // public function index()
    // {
    //     return Pegawai::all(); // Pastikan data di-return dalam format JSON
    // }
    // PegawaiController.php
    public function index()
    {
        try {
            $pegawai = Pegawai::all();
            \Log::info('Data Pegawai berhasil diambil', ['count' => $pegawai->count()]);
            return response()->json($pegawai);
        } catch (\Exception $e) {
            \Log::error('Error mengambil data pegawai: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|unique:pegawai,nip',
            'tahun_aktif' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        ]);

        $pegawai = Pegawai::create($validated);
        return response()->json($pegawai, 201);
    }

    public function update(Request $request, Pegawai $pegawai)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nip' => ['nullable', 'string', Rule::unique('pegawai')->ignore($pegawai->id)],
            'tahun_aktif' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        ]);

        $pegawai->update($validated);
        return response()->json($pegawai);
    }

    public function destroy(Pegawai $pegawai)
    {
        $pegawai->delete();
        return response()->json(null, 204);
    }
}