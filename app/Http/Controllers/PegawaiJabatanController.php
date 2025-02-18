<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use App\Models\PegawaiJabatan;
// use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;

class PegawaiJabatanController extends Controller
{
    // public function index()
    // {
    //     return PegawaiJabatan::with(['pegawai', 'jabatan'])->get();
    // }

    // public function store(Request $request)
    // {
    //     try {
    //         $validated = $request->validate([
    //             'pegawai_id' => 'required|exists:pegawai,id',
    //             'jabatan_id' => 'required|exists:jabatan,id',
    //             'peran' => 'nullable|string'
    //         ]);
            
    //         $strukturOrganisasi = StrukturOrganisasi::create($validated);
    //         return response()->json($strukturOrganisasi, 201);
    //     } catch (\Exception $e) {
    //         \Log::error('Create error: ' . $e->getMessage());
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    // public function update(Request $request, $id)
    // {
    //     try {
    //         $validated = $request->validate([
    //             'pegawai_id' => 'required|exists:pegawai,id',
    //             'jabatan_id' => 'required|exists:jabatan,id',
    //             'peran' => 'nullable|string'
    //         ]);
            
    //         $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);
    //         $strukturOrganisasi->update($validated);
            
    //         return response()->json($strukturOrganisasi);
    //     } catch (\Exception $e) {
    //         \Log::error('Update error: ' . $e->getMessage());
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    // public function destroy($id)
    // {
    //     try {
    //         $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);
    //         $strukturOrganisasi->delete();
            
    //         return response()->json(['message' => 'Data berhasil dihapus']);
    //     } catch (\Exception $e) {
    //         \Log::error('Delete error: ' . $e->getMessage());
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    public function index()
    {
        $pegawaiJabatan = PegawaiJabatan::with(['pegawai', 'jabatan'])->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'pegawai_id' => $item->pegawai_id,
                    'jabatan_id' => $item->jabatan_id,
                    'peran' => $item->peran,
                    'pegawai' => $item->pegawai,
                    'jabatan' => $item->jabatan,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ];
            });
        
        return response()->json($pegawaiJabatan);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string'
        ]);

        $pegawaiJabatan = PegawaiJabatan::create($validated);
        
        return response()->json($pegawaiJabatan->load(['pegawai', 'jabatan']), 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string'
        ]);

        $pegawaiJabatan = PegawaiJabatan::findOrFail($id);
        $pegawaiJabatan->update($validated);
        
        return response()->json($pegawaiJabatan->load(['pegawai', 'jabatan']));
    }

    public function destroy($id)
    {
        $pegawaiJabatan = PegawaiJabatan::findOrFail($id);
        $pegawaiJabatan->delete();
        
        return response()->json(null, 204);
    }
    
    public function getMembers()
    {
        $members = Pegawai::join('pegawai_jabatan', 'pegawai.id', '=', 'pegawai_jabatan.pegawai_id')
            ->join('jabatan', 'jabatan.id', '=', 'pegawai_jabatan.jabatan_id')
            ->select(
                'pegawai.nama as name',
                'jabatan.nama_jabatan as position',
                'pegawai.nip',
                'pegawai.tahun_aktif as activeYear'
            )
            ->get();

        return response()->json($members);
    }

    public function getDepartmentStaff()
    {
        $departmentStaff = Pegawai::join('pegawai_jabatan', 'pegawai.id', '=', 'pegawai_jabatan.pegawai_id')
            ->join('jabatan', 'jabatan.id', '=', 'pegawai_jabatan.jabatan_id')
            ->select(
                'jabatan.nama_jabatan as department',
                'pegawai.nama as name',
                'pegawai_jabatan.peran as subDepartment',
                'pegawai.nip'
            )
            ->get()
            ->groupBy('department');

        return response()->json($departmentStaff);
    }
}
