<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index()
    {
        $strukturOrganisasi = PegawaiJabatan::with(['pegawai', 'jabatan'])->get();
        return response()->json($strukturOrganisasi);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string|max:255',
        ]);

        $organization = PegawaiJabatan::create($validated);
        return response()->json($organization, 201);
    }

    public function update(Request $request, $id)
    {
        $organization = PegawaiJabatan::findOrFail($id);
        
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string|max:255',
        ]);

        $organization->update($validated);
        return response()->json($organization);
    }

    public function destroy($id)
    {
        $organization = PegawaiJabatan::findOrFail($id);
        $organization->delete();
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
        $departments = Jabatan::all();
        $departmentStaff = [];

        foreach ($departments as $department) {
            $staff = Pegawai::join('pegawai_jabatan', 'pegawai.id', '=', 'pegawai_jabatan.pegawai_id')
                ->where('pegawai_jabatan.jabatan_id', $department->id)
                ->select(
                    'pegawai.nama as name',
                    'pegawai_jabatan.peran as subDepartment',
                    'pegawai.nip'
                )
                ->get();

            $departmentStaff[$department->nama_jabatan] = $staff;
        }

        return response()->json($departmentStaff);
    }
}
