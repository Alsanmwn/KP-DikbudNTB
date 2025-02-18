<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $table = 'pegawai';
    protected $fillable = ['nama', 'nip', 'tahun_aktif'];

    public function jabatan()
    {
        return $this->belongsToMany(Jabatan::class, 'pegawai_jabatan')
                    ->withPivot('peran')
                    ->withTimestamps();
    }

    public static function boot()
    {
        parent::boot();
    
        static::deleting(function ($pegawai) {
            $pegawai->jabatan()->detach();
        });
    }    

}

