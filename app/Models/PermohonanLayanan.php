<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermohonanLayanan extends Model
{
    protected $table = 'permohonanlayanans';
    
    protected $fillable = [
        'user_id',
        'nama',
        'email',
        'alamat_sekolah',
        'nama_kegiatan',
        'keperluan',
        'custom_keperluan',
        'kontak',
        'files',
        'status',
        'catatan_admin'
    ];

    protected $casts = [
        'files' => 'array'
    ];

    // ✅ Relasi ke user (opsional tapi disarankan)
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}