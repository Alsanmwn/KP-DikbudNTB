<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class Jabatan extends Model
// {
//     protected $table = 'jabatan';
//     protected $fillable = ['nama_jabatan'];

//     public function pegawai()
//     {
//         return $this->belongsToMany(Pegawai::class, 'pegawai_jabatan')
//                     ->withPivot('peran')
//                     ->withTimestamps();
//     }
// }

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    use HasFactory;

    protected $table = 'jabatan';
    
    protected $fillable = [
        'nama_jabatan'
    ];

    // // Hapus cascadeOnDelete jika ada
    // public function pegawaiJabatan()
    // {
    //     return $this->hasMany(PegawaiJabatan::class, 'jabatan_id');
    // }
    public function pegawai()
    {
        return $this->belongsToMany(Pegawai::class, 'pegawai_jabatan')
                    ->withPivot('peran')
                    ->withTimestamps();
    }
}

