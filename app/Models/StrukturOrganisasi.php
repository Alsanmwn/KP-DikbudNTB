<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrukturOrganisasi extends Model
{
    protected $fillable = ['pegawai_id', 'jabatan_id', 'peran'];
    
    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }
    
    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }
}
