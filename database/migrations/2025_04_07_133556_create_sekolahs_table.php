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
    public function up(): void
    {
        Schema::create('sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('npsn')->unique();
            $table->string('bp'); // Bentuk Pendidikan (SMA/SMK/SLB)
            $table->string('status'); // Negeri / Swasta
            $table->integer('jumlah_guru')->default(0);
            $table->integer('jumlah_pegawai')->default(0);
            $table->integer('ruang_kelas')->default(0);
            $table->integer('ruang_lab')->default(0);
            $table->integer('ruang_perpus')->default(0);
            $table->string('kepala_sekolah')->nullable();
            $table->string('akreditasi')->nullable();
            $table->string('kurikulum')->nullable();
            $table->string('status_kepemilikan')->nullable();
            $table->string('sk_pendirian')->nullable();
            $table->date('tgl_sk_pendirian')->nullable();
            $table->string('sk_izin_operasional')->nullable();
            $table->date('tgl_sk_izin_operasional')->nullable();
            $table->text('alamat');
            $table->string('kecamatan');
            $table->string('kabupaten');
            $table->string('provinsi');
            $table->string('kode_pos');
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
        Schema::dropIfExists('sekolahs');
    }
};
