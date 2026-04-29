<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GuruController extends Controller
{
    // Add these methods to your GuruController:

    public function index()
    {
        $guru = Guru::with('sekolah')->get();
        return response()->json($guru);
    }

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

    /**
     * Add multiple guru records in a batch.
     */
    public function batchAdd(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'sekolah_id' => 'required|exists:sekolahs,id',
            'laki_laki' => 'required|integer|min:0',
            'perempuan' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Start transaction
        DB::beginTransaction();
        try {
            // Create guru records for laki-laki
            for ($i = 0; $i < $request->laki_laki; $i++) {
                Guru::create([
                    'sekolah_id' => $request->sekolah_id,
                    'jenis_kelamin' => 'Laki-laki',
                ]);
            }

            // Create guru records for perempuan
            for ($i = 0; $i < $request->perempuan; $i++) {
                Guru::create([
                    'sekolah_id' => $request->sekolah_id,
                    'jenis_kelamin' => 'Perempuan',
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Data guru berhasil ditambahkan'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menambahkan data guru: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Retrieve guru summary reports by kabupaten
     */
    public function summary()
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

    /**
     * Retrieve guru data for a specific school
     */
    public function bySchool($schoolId)
    {
        $guru = Guru::where('sekolah_id', $schoolId)
            ->select('id', 'jenis_kelamin')
            ->get();

        return response()->json($guru);
    }
}

