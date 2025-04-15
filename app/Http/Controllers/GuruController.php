<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GuruController extends Controller
{
    // Add these methods to your GuruController:

    public function guruSummary()
    {
        $data = DB::table('gurus')
            ->join('sekolahs', 'gurus.sekolah_id', '=', 'sekolahs.id')
            ->select(
                'sekolahs.kabupaten as wilayah',
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
            )
            ->groupBy('sekolahs.kabupaten')
            ->get();

        return response()->json($data);
    }

    public function guruSummaryByKabupaten($kabupaten)
    {
        $data = DB::table('gurus')
            ->join('sekolahs', 'gurus.sekolah_id', '=', 'sekolahs.id')
            ->where('sekolahs.kabupaten', $kabupaten)
            ->select(
                'sekolahs.kecamatan as wilayah',
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as sma_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMA" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as sma_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as smk_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SMK" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as smk_p'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as slb_l'),
                DB::raw('SUM(CASE WHEN sekolahs.bp = "SLB" AND gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as slb_p')
            )
            ->groupBy('sekolahs.kecamatan')
            ->get();

        return response()->json($data);
    }

    public function guruBySekolah($kabupaten, $kecamatan)
    {
        $data = DB::table('gurus')
            ->join('sekolahs', 'gurus.sekolah_id', '=', 'sekolahs.id')
            ->where('sekolahs.kabupaten', $kabupaten)
            ->where('sekolahs.kecamatan', $kecamatan)
            ->select(
                'sekolahs.id',
                'sekolahs.nama as wilayah',
                'sekolahs.bp',
                DB::raw('SUM(CASE WHEN gurus.jenis_kelamin = "Laki-laki" THEN 1 ELSE 0 END) as guru_l'),
                DB::raw('SUM(CASE WHEN gurus.jenis_kelamin = "Perempuan" THEN 1 ELSE 0 END) as guru_p')
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
                    $result['sma_l'] = $item->guru_l;
                    $result['sma_p'] = $item->guru_p;
                } else if ($bp == 'SMK') {
                    $result['smk_l'] = $item->guru_l;
                    $result['smk_p'] = $item->guru_p;
                } else if ($bp == 'SLB') {
                    $result['slb_l'] = $item->guru_l;
                    $result['slb_p'] = $item->guru_p;
                }
                
                return $result;
            });

        return response()->json($data);
    }

    public function guruDetail($schoolId)
    {
        $guru = DB::table('gurus')
            ->where('sekolah_id', $schoolId)
            ->select('id', 'jenis_kelamin')
            ->get();

        return response()->json($guru);
    }
}
