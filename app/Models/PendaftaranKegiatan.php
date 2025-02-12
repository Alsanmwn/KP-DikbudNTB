<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendaftaranKegiatan extends Model
{
    use HasFactory;

    protected $table = 'pendaftarankegiatans';

    protected $fillable = [
        'namaLengkap',
        'jenisKelamin',
        'tanggalLahir',
        'alamat',
        'nomorHP',
        'email',
        'user_id',
        'kegiatan_id'
    ];

    protected $dates = ['tanggalLahir'];
}