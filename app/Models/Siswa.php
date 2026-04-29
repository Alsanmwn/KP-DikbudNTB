<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $fillable = ['sekolah_id', 'jenis_kelamin'];

    public function sekolah()
    {
        return $this->belongsTo(Sekolah::class);
    }
}

