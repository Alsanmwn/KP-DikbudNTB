<?php

// namespace App\Http\Controllers;

// use App\Models\Pegawai;
// use App\Models\Jabatan;
// use Illuminate\Http\Request;

// class OrganizationController extends Controller
// {
//     public function getStructure()
//     {
//         $structure = Pegawai::with(['jabatan' => function($query) {
//             $query->select('jabatan.id', 'nama_jabatan');
//         }])->get()->map(function($pegawai) {
//             $mainPosition = $pegawai->jabatan->first();
//             return [
//                 'name' => $pegawai->nama,
//                 'position' => $mainPosition ? $mainPosition->nama_jabatan : null,
//                 'nip' => $pegawai->nip,
//                 'activeYear' => $pegawai->tahun_aktif . '-Sekarang'
//             ];
//         });

//         return response()->json($structure);
//     }

//     public function getDepartmentStaff($jabatanId)
//     {
//         $staff = Pegawai::whereHas('jabatan', function($query) use ($jabatanId) {
//             $query->where('jabatan.id', $jabatanId);
//         })->with(['jabatan' => function($query) {
//             $query->select('jabatan.id', 'nama_jabatan');
//         }])->get()->map(function($pegawai) {
//             return [
//                 'name' => $pegawai->nama,
//                 'subDepartment' => $pegawai->jabatan->first()->pivot->peran ?? $pegawai->jabatan->first()->nama_jabatan,
//                 'nip' => $pegawai->nip
//             ];
//         });

//         return response()->json($staff);
//     }
// }


namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
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
