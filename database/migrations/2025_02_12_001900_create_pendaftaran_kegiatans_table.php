<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('pendaftarankegiatans', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('namaLengkap');
        //     $table->string('jenisKelamin');
        //     $table->date('tanggalLahir');
        //     $table->text('alamat');
        //     $table->string('nomorHP');
        //     $table->string('email');
        //     $table->foreignId('user_id')  // Menambahkan foreign key untuk tabel users
        //           ->constrained('users')   // Relasi ke tabel users
        //           ->onDelete('cascade');   // Menghapus data di pendaftarankegiatan jika user dihapus
        //     $table->foreignId('kegiatan_id')  // Menambahkan foreign key untuk tabel kegiatan
        //           ->constrained('kegiatans')   // Relasi ke tabel kegiatan
        //           ->onDelete('cascade');   // Menghapus data pendaftaran jika kegiatan dihapus
        //     $table->timestamps();
        // });
        Schema::create('pendaftarankegiatans', function (Blueprint $table) {
            $table->id();
            $table->string('namaLengkap');
            $table->string('jenisKelamin');
            $table->date('tanggalLahir');
            $table->text('alamat');
            $table->string('nomorHP');
            $table->string('email');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('kegiatan_id')->constrained('kegiatans');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pendaftarankegiatans');
    }
};
