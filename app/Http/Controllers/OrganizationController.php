<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use App\Models\PegawaiJabatan;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    // // public function index()
    // // {
    // //     $strukturOrganisasi = PegawaiJabatan::with(['pegawai', 'jabatan'])->get();
    // //     return response()->json($strukturOrganisasi);
    // // }
    // // public function index()
    // // {
    // //     try {
    // //         $data = Model::all();
    // //         return response()->json($data);
    // //     } catch (\Exception $e) {
    // //         \Log::error('Error fetching data: ' . $e->getMessage());
    // //         return response()->json(['error' => $e->getMessage()], 500);
    // //     }
    // // }
    // public function index()
    // {
    //     try {
    //         $data = Model::all();
    //         return response()->json($data);
    //     } catch (\Exception $e) {
    //         \Log::error('Error fetching data: ' . $e->getMessage());
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'pegawai_id' => 'required|exists:pegawai,id',
    //         'jabatan_id' => 'required|exists:jabatan,id',
    //         'peran' => 'nullable|string|max:255',
    //     ]);

    //     $organization = PegawaiJabatan::create($validated);
    //     return response()->json($organization, 201);
    // }

    // public function update(Request $request, $id)
    // {
    //     $organization = PegawaiJabatan::findOrFail($id);
        
    //     $validated = $request->validate([
    //         'pegawai_id' => 'required|exists:pegawai,id',
    //         'jabatan_id' => 'required|exists:jabatan,id',
    //         'peran' => 'nullable|string|max:255',
    //     ]);

    //     $organization->update($validated);
    //     return response()->json($organization);
    // }

    // // public function destroy($id)
    // // {
    // //     $organization = PegawaiJabatan::findOrFail($id);
    // //     $organization->delete();
    // //     return response()->json(null, 204);
    // // }
    // public function destroy($id)
    // {
    //     $organization = PegawaiJabatan::find($id);
    //     if (!$organization) {
    //         return response()->json(['message' => 'Data tidak ditemukan'], 404);
    //     }
    //     $organization->delete();
    //     return response()->json(['message' => 'Data berhasil dihapus'], 200);
    // }

    // public function index()
    // {
    //     try {
    //         \Log::info('Fetching struktur organisasi data');
            
    //         $data = StrukturOrganisasi::with(['pegawai', 'jabatan'])->get();
            
    //         \Log::info('Struktur organisasi data:', ['count' => $data->count()]);
            
    //         return response()->json($data);
    //     } catch (\Exception $e) {
    //         \Log::error('Struktur organisasi error: ' . $e->getMessage());
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    public function index()
    {
        return PegawaiJabatan::with(['pegawai', 'jabatan'])->get();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'pegawai_id' => 'required|exists:pegawai,id',
                'jabatan_id' => 'required|exists:jabatan,id',
                'peran' => 'nullable|string'
            ]);
            
            $strukturOrganisasi = StrukturOrganisasi::create($validated);
            return response()->json($strukturOrganisasi, 201);
        } catch (\Exception $e) {
            \Log::error('Create error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'pegawai_id' => 'required|exists:pegawai,id',
                'jabatan_id' => 'required|exists:jabatan,id',
                'peran' => 'nullable|string'
            ]);
            
            $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);
            $strukturOrganisasi->update($validated);
            
            return response()->json($strukturOrganisasi);
        } catch (\Exception $e) {
            \Log::error('Update error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);
            $strukturOrganisasi->delete();
            
            return response()->json(['message' => 'Data berhasil dihapus']);
        } catch (\Exception $e) {
            \Log::error('Delete error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
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

    // public function getDepartmentStaff()
    // {
    //     $departments = Jabatan::all();
    //     $departmentStaff = [];

    //     foreach ($departments as $department) {
    //         $staff = Pegawai::join('pegawai_jabatan', 'pegawai.id', '=', 'pegawai_jabatan.pegawai_id')
    //             ->where('pegawai_jabatan.jabatan_id', $department->id)
    //             ->select(
    //                 'pegawai.nama as name',
    //                 'pegawai_jabatan.peran as subDepartment',
    //                 'pegawai.nip'
    //             )
    //             ->get();

    //         $departmentStaff[$department->nama_jabatan] = $staff;
    //     }

    //     return response()->json($departmentStaff);
    // }
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
