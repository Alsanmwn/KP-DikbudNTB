<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Tabel Pegawai
        Schema::create('pegawai', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nip')->unique()->nullable();
            $table->year('tahun_aktif');
            $table->timestamps();
        });

        // Tabel Jabatan
        Schema::create('jabatan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jabatan')->unique();
            $table->timestamps();
        });

        // Tabel Many-to-Many Pegawai <-> Jabatan
        Schema::create('pegawai_jabatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawai')->onDelete('cascade');
            $table->foreignId('jabatan_id')->constrained('jabatan')->onDelete('cascade');
            $table->string('peran')->nullable(); // Contoh: "Tenaga Pendukung DI", "Anggota", dll.
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pegawai_jabatan');
        Schema::dropIfExists('jabatan');
        Schema::dropIfExists('pegawai');
    }
};
