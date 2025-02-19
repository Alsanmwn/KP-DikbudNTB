<?php
// app/Models/PermohonanLayanan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermohonanLayanan extends Model
{
    protected $table = 'permohonanlayanans';
    
    protected $fillable = [
        'nama',
        'email',
        'alamat_sekolah',
        'nama_kegiatan',
        'keperluan',
        'custom_keperluan',
        'kontak',
        'files'
    ];

    protected $casts = [
        'files' => 'array'
    ];
}