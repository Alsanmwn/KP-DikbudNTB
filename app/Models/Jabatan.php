<?php

// app/Models/Jabatan.php
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

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    protected $table = 'jabatan';
    protected $fillable = ['nama_jabatan'];

    public function pegawai()
    {
        return $this->belongsToMany(Pegawai::class, 'pegawai_jabatan')
                    ->withPivot('peran')
                    ->withTimestamps();
    }
}

