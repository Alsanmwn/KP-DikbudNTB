<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;
use App\Models\Jabatan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PegawaiJabatanController extends Controller
{
    /**
     * Display a listing of the strukturOrganisasi.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all records from the pegawai_jabatan pivot table
        $strukturOrganisasi = DB::table('pegawai_jabatan')
            ->select('pegawai_jabatan.*')
            ->get();
        
        return response()->json($strukturOrganisasi);
    }

    /**
     * Store a newly created strukturOrganisasi in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Check for existing relationship to avoid duplicates
        $exists = DB::table('pegawai_jabatan')
            ->where('pegawai_id', $request->pegawai_id)
            ->where('jabatan_id', $request->jabatan_id)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Hubungan pegawai dan jabatan ini sudah ada.'], 422);
        }

        // Insert to pivot table
        $id = DB::table('pegawai_jabatan')->insertGetId([
            'pegawai_id' => $request->pegawai_id,
            'jabatan_id' => $request->jabatan_id,
            'peran' => $request->peran,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Return the created record
        $strukturOrganisasi = DB::table('pegawai_jabatan')->find($id);
        
        return response()->json($strukturOrganisasi, 201);
    }

    /**
     * Display the specified strukturOrganisasi.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $strukturOrganisasi = DB::table('pegawai_jabatan')->find($id);
        
        if (!$strukturOrganisasi) {
            return response()->json(['error' => 'Data struktur organisasi tidak ditemukan'], 404);
        }

        return response()->json($strukturOrganisasi);
    }

    /**
     * Update the specified strukturOrganisasi in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $strukturOrganisasi = DB::table('pegawai_jabatan')->find($id);
        
        if (!$strukturOrganisasi) {
            return response()->json(['error' => 'Data struktur organisasi tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'pegawai_id' => 'required|exists:pegawai,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'peran' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Check for existing relationship to avoid duplicates
        $exists = DB::table('pegawai_jabatan')
            ->where('pegawai_id', $request->pegawai_id)
            ->where('jabatan_id', $request->jabatan_id)
            ->where('id', '!=', $id)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Hubungan pegawai dan jabatan ini sudah ada.'], 422);
        }

        // Update the record
        DB::table('pegawai_jabatan')
            ->where('id', $id)
            ->update([
                'pegawai_id' => $request->pegawai_id,
                'jabatan_id' => $request->jabatan_id,
                'peran' => $request->peran,
                'updated_at' => now(),
            ]);

        // Return the updated record
        $updatedStruktureOrganisasi = DB::table('pegawai_jabatan')->find($id);
        
        return response()->json($updatedStruktureOrganisasi);
    }

    /**
     * Remove the specified strukturOrganisasi from database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $strukturOrganisasi = DB::table('pegawai_jabatan')->find($id);
        
        if (!$strukturOrganisasi) {
            return response()->json(['error' => 'Data struktur organisasi tidak ditemukan'], 404);
        }

        DB::table('pegawai_jabatan')->where('id', $id)->delete();

        return response()->json(['message' => 'Data struktur organisasi berhasil dihapus']);
    }

    /**
     * Get all structure data with related pegawai and jabatan information
     * 
     * @return \Illuminate\Http\Response
     */
    public function getRelationalData()
    {
        $strukturWithRelations = DB::table('pegawai_jabatan')
            ->join('pegawai', 'pegawai_jabatan.pegawai_id', '=', 'pegawai.id')
            ->join('jabatan', 'pegawai_jabatan.jabatan_id', '=', 'jabatan.id')
            ->select(
                'pegawai_jabatan.id',
                'pegawai_jabatan.pegawai_id',
                'pegawai_jabatan.jabatan_id',
                'pegawai_jabatan.peran',
                'pegawai.nama as pegawai_nama',
                'pegawai.nip as pegawai_nip',
                'pegawai.tahun_aktif as pegawai_tahun_aktif',
                'jabatan.nama_jabatan'
            )
            ->get();

        return response()->json($strukturWithRelations);
    }
}