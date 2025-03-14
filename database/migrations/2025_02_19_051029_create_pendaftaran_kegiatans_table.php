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