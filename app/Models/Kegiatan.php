<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'deskripsi',
        'tanggal',
        'waktu',
        'lokasi',
        'gambar',
        'status',
        'link_pendaftaran',  // Add this line
        'link_kegiatan'
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function pendaftaran()
    {
        return $this->hasMany(PendaftaranKegiatan::class, 'kegiatan_id');
    }
}