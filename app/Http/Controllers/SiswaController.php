<?php

// namespace App\Http\Controllers;

// use App\Models\Sekolah;
// use App\Models\Siswa;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;

// class SiswaController extends Controller
// {
//     // Get student summary by Kabupaten
//     public function siswaSummary()
//     {
//         $data = DB::table('siswas')
//             ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
//             ->select(
//                 'sekolahs.kabupaten as wilayah',
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
//             )
//             ->groupBy('sekolahs.kabupaten')
//             ->get();

//         return response()->json($data);
//     }

//     // Get student summary by Kecamatan for a specific Kabupaten
//     public function siswaSummaryByKabupaten($kabupaten)
//     {
//         $data = DB::table('siswas')
//             ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
//             ->where('sekolahs.kabupaten', $kabupaten)
//             ->select(
//                 'sekolahs.kecamatan as wilayah',
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
//                 DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
//             )
//             ->groupBy('sekolahs.kecamatan')
//             ->get();

//         return response()->json($data);
//     }

//     // Get student counts by school for a specific Kecamatan
//     public function siswaBySekolah($kabupaten, $kecamatan)
//     {
//         $data = DB::table('siswas')
//             ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
//             ->where('sekolahs.kabupaten', $kabupaten)
//             ->where('sekolahs.kecamatan', $kecamatan)
//             ->select(
//                 'sekolahs.id',
//                 'sekolahs.nama as wilayah',
//                 'sekolahs.bp',
//                 DB::raw('SUM(CASE WHEN siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as siswa_l'),
//                 DB::raw('SUM(CASE WHEN siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as siswa_p')
//             )
//             ->groupBy('sekolahs.id', 'sekolahs.nama', 'sekolahs.bp')
//             ->get()
//             ->map(function($item) {
//                 // Transform data to match expected structure in frontend
//                 $bp = $item->bp;
//                 $result = [
//                     'id' => $item->id,
//                     'wilayah' => $item->wilayah,
//                 ];
                
//                 if ($bp == 'SMA') {
//                     $result['sma_l'] = $item->siswa_l;
//                     $result['sma_p'] = $item->siswa_p;
//                 } else if ($bp == 'SMK') {
//                     $result['smk_l'] = $item->siswa_l;
//                     $result['smk_p'] = $item->siswa_p;
//                 } else if ($bp == 'SLB') {
//                     $result['slb_l'] = $item->siswa_l;
//                     $result['slb_p'] = $item->siswa_p;
//                 }
                
//                 return $result;
//             });

//         return response()->json($data);
//     }

//     // Get student details for a specific school
//     public function siswaDetail($schoolId)
//     {
//         $siswa = DB::table('siswas')
//             ->where('sekolah_id', $schoolId)
//             ->select('id', 'jenis_kelamin')
//             ->get();

//         return response()->json($siswa);
//     }
// }


namespace App\Http\Controllers;

use App\Models\Sekolah;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiswaController extends Controller
{
    // Get all students with school information
    public function index()
    {
        $siswa = Siswa::with('sekolah')->get();
        return response()->json($siswa);
    }

    // Store a new student
    public function store(Request $request)
    {
        $request->validate([
            'sekolah_id' => 'required|exists:sekolahs,id',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
        ]);

        $siswa = Siswa::create($request->all());
        return response()->json($siswa->load('sekolah'), 201);
    }

    // Get a specific student
    public function show($id)
    {
        $siswa = Siswa::with('sekolah')->findOrFail($id);
        return response()->json($siswa);
    }

    // Update a student
    public function update(Request $request, $id)
    {
        $request->validate([
            'sekolah_id' => 'sometimes|required|exists:sekolahs,id',
            'jenis_kelamin' => 'sometimes|required|in:Laki-laki,Perempuan',
        ]);

        $siswa = Siswa::findOrFail($id);
        $siswa->update($request->all());
        return response()->json($siswa->load('sekolah'));
    }

    // Delete a student
    public function destroy($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();
        return response()->json(null, 204);
    }

    // Get student summary by Kabupaten
    public function siswaSummary()
    {
        $data = DB::table('siswas')
            ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
            ->select(
                'sekolahs.kabupaten as wilayah',
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
            )
            ->groupBy('sekolahs.kabupaten')
            ->get();

        return response()->json($data);
    }

    // Get student summary by Kecamatan for a specific Kabupaten
    public function siswaSummaryByKabupaten($kabupaten)
    {
        $data = DB::table('siswas')
            ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
            ->where('sekolahs.kabupaten', $kabupaten)
            ->select(
                'sekolahs.kecamatan as wilayah',
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
            )
            ->groupBy('sekolahs.kecamatan')
            ->get();

        return response()->json($data);
    }

    // Get student counts by school for a specific Kecamatan
    public function siswaBySekolah($kabupaten, $kecamatan)
    {
        $data = DB::table('siswas')
            ->join('sekolahs', 'siswas.sekolah_id', '=', 'sekolahs.id')
            ->where('sekolahs.kabupaten', $kabupaten)
            ->where('sekolahs.kecamatan', $kecamatan)
            ->select(
                'sekolahs.id',
                'sekolahs.nama as wilayah',
                'sekolahs.bp',
                DB::raw('SUM(CASE WHEN siswas.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as siswa_l'),
                DB::raw('SUM(CASE WHEN siswas.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as siswa_p')
            )
            ->groupBy('sekolahs.id', 'sekolahs.nama', 'sekolahs.bp')
            ->get()
            ->map(function($item) {
                // Transform data to match expected structure in frontend
                $bp = $item->bp;
                $result = [
                    'id' => $item->id,
                    'wilayah' => $item->wilayah,
                ];
                
                if ($bp == 'SMA') {
                    $result['sma_l'] = $item->siswa_l;
                    $result['sma_p'] = $item->siswa_p;
                } else if ($bp == 'SMK') {
                    $result['smk_l'] = $item->siswa_l;
                    $result['smk_p'] = $item->siswa_p;
                } else if ($bp == 'SLB') {
                    $result['slb_l'] = $item->siswa_l;
                    $result['slb_p'] = $item->siswa_p;
                }
                
                return $result;
            });

        return response()->json($data);
    }

    // Get student details for a specific school
    public function siswaDetail($schoolId)
    {
        $siswa = DB::table('siswas')
            ->where('sekolah_id', $schoolId)
            ->select('id', 'jenis_kelamin')
            ->get();

        return response()->json($siswa);
    }
    
    public function batchAdd(Request $request)
{
    $validated = $request->validate([
        'sekolah_id' => 'required|exists:sekolahs,id',
        'laki_laki' => 'required|integer|min:0',
        'perempuan' => 'required|integer|min:0'
    ]);

    $students = [];
    
    // Tambahkan siswa laki-laki
    for ($i = 0; $i < $validated['laki_laki']; $i++) {
        $students[] = [
            'sekolah_id' => $validated['sekolah_id'],
            'jenis_kelamin' => 'Laki-laki',
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
    
    // Tambahkan siswa perempuan
    for ($i = 0; $i < $validated['perempuan']; $i++) {
        $students[] = [
            'sekolah_id' => $validated['sekolah_id'],
            'jenis_kelamin' => 'Perempuan',
            'created_at' => now(),
            'updated_at' => now()
        ];
    }

    // Insert batch ke database
    DB::table('siswas')->insert($students);

    return response()->json([
        'message' => 'Siswa berhasil ditambahkan',
        'total' => count($students)
    ]);
}
}