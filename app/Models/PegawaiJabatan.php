<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PegawaiJabatan extends Model
{
    protected $table = 'pegawai_jabatan';
    
    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }
    
    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }
}