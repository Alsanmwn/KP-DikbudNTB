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
        'status'
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}