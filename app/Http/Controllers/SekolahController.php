<?php


namespace App\Http\Controllers;


use App\Models\Sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SekolahController extends Controller
{
    public function index()
    {
        // $sekolah = Sekolah::all();
        // return view('sekolah.index', compact('sekolah'));
        return response()->json(Sekolah::all());
    }
   
    public function create()
    {
        return view('sekolah.create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'npsn' => 'required|unique:sekolahs',
            'bp' => 'required',
            'status' => 'required',
            'alamat' => 'required',
            'kecamatan' => 'required',
            'kabupaten' => 'required',
            'provinsi' => 'required',
            'kode_pos' => 'required',
        ]);


        Sekolah::create($request->all());
        return redirect()->route('sekolah.index')->with('success', 'Data sekolah berhasil ditambahkan');
    }


    public function show(Sekolah $sekolah)
    {
        return view('sekolah.show', compact('sekolah'));
    }


    public function edit(Sekolah $sekolah)
    {
        return view('sekolah.edit', compact('sekolah'));
    }


    public function update(Request $request, Sekolah $sekolah)
    {
        $sekolah->update($request->all());
        return redirect()->route('sekolah.index')->with('success', 'Data sekolah berhasil diupdate');
    }


    public function destroy(Sekolah $sekolah)
    {
        $sekolah->delete();
        return redirect()->route('sekolah.index')->with('success', 'Data sekolah berhasil dihapus');
    }


    // Tambahkan metode-metode berikut di SekolahController atau buat ApiSekolahController baru


    public function getSekolahSummary()
    {
        // Mengambil data ringkasan sekolah per kabupaten
        $data = DB::table('sekolahs')
            ->select('kabupaten as wilayah',
                DB::raw('COUNT(CASE WHEN bp = "SMA" AND status = "Negeri" THEN 1 END) as sma_n'),
                DB::raw('COUNT(CASE WHEN bp = "SMA" AND status = "Swasta" THEN 1 END) as sma_s'),
                DB::raw('COUNT(CASE WHEN bp = "SMA" THEN 1 END) as sma_jml'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" AND status = "Negeri" THEN 1 END) as smk_n'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" AND status = "Swasta" THEN 1 END) as smk_s'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" THEN 1 END) as smk_jml'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" AND status = "Negeri" THEN 1 END) as slb_n'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" AND status = "Swasta" THEN 1 END) as slb_s'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" THEN 1 END) as slb_jml')
            )
            ->groupBy('kabupaten')
            ->get();
           
        return response()->json($data);
    }


    public function getSekolahSummaryByKabupaten($kabupaten)
    {
        // Mengambil data ringkasan sekolah per kecamatan dalam kabupaten tertentu
        $data = DB::table('sekolahs')
            ->where('kabupaten', $kabupaten)
            ->select('kecamatan as wilayah',
                DB::raw('COUNT(CASE WHEN bp = "SMA" AND status = "Negeri" THEN 1 END) as sma_n'),
                DB::raw('COUNT(CASE WHEN bp = "SMA" AND status = "Swasta" THEN 1 END) as sma_s'),
                DB::raw('COUNT(CASE WHEN bp = "SMA" THEN 1 END) as sma_jml'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" AND status = "Negeri" THEN 1 END) as smk_n'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" AND status = "Swasta" THEN 1 END) as smk_s'),
                DB::raw('COUNT(CASE WHEN bp = "SMK" THEN 1 END) as smk_jml'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" AND status = "Negeri" THEN 1 END) as slb_n'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" AND status = "Swasta" THEN 1 END) as slb_s'),
                DB::raw('COUNT(CASE WHEN bp = "SLB" THEN 1 END) as slb_jml')
            )
            ->groupBy('kecamatan')
            ->get();
           
        return response()->json($data);
    }


    public function getSekolahDetail($kabupaten, $kecamatan)
    {
        // Mengambil daftar sekolah di kecamatan dan kabupaten tertentu
        $data = Sekolah::where('kabupaten', $kabupaten)
            ->where('kecamatan', $kecamatan)
            ->select('id', 'nama', 'npsn', 'bp', 'status',
                    'jumlah_guru', 'jumlah_pegawai',
                    'ruang_kelas', 'ruang_lab', 'ruang_perpus')
            ->get();
           
        return response()->json($data);
    }


    public function getSekolahFull($id)
{
    // Mengambil detail lengkap sekolah berdasarkan ID
    $sekolah = Sekolah::findOrFail($id);
   
    return response()->json([
        'id' => $sekolah->id,
        'nama' => $sekolah->nama,
        'npsn' => $sekolah->npsn,
        'bp' => $sekolah->bp, // Ganti menjadi bentuk_pendidikan
        'status' => $sekolah->status,
        'status_kepemilikan' => $sekolah->status_kepemilikan,
        'sk_pendirian' => $sekolah->sk_pendirian,
        'tgl_sk_pendirian' => $sekolah->tgl_sk_pendirian, // Ganti menjadi tanggal_sk_pendirian
        'kepala_sekolah' => $sekolah->kepala_sekolah,
        'akreditasi' => $sekolah->akreditasi,
        'kurikulum' => $sekolah->kurikulum,
        'sk_izin_operasional' => $sekolah->sk_izin_operasional,
        'tgl_sk_izin' => $sekolah->tgl_sk_izin_operasional, // Ganti menjadi tanggal_sk_izin
        'alamat' => $sekolah->alamat,
        'kecamatan' => $sekolah->kecamatan,
        'kabupaten' => $sekolah->kabupaten,
        'provinsi' => $sekolah->provinsi,
        'kode_pos' => $sekolah->kode_pos,
    ]);
}
}


