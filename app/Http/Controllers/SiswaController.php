<?php

namespace App\Http\Controllers;

use App\Models\Sekolah;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiswaController extends Controller
{
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
}