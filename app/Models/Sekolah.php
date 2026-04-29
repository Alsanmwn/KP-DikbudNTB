<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sekolah extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama', 'npsn', 'bp', 'status', 'jumlah_guru', 'jumlah_pegawai',
        'ruang_kelas', 'ruang_lab', 'ruang_perpus', 'kepala_sekolah',
        'akreditasi', 'kurikulum', 'status_kepemilikan', 'sk_pendirian',
        'tgl_sk_pendirian', 'sk_izin_operasional', 'tgl_sk_izin_operasional',
        'alamat', 'kecamatan', 'kabupaten', 'provinsi', 'kode_pos'
    ];

    public function gurus()
    {
        return $this->hasMany(Guru::class);
    }

    public function siswas()
    {
        return $this->hasMany(Siswa::class);
    }
}

