<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('permohonanlayanans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email');
            $table->string('alamat_sekolah');
            $table->string('nama_kegiatan');
            $table->string('keperluan');
            $table->string('custom_keperluan')->nullable();
            $table->string('kontak');
            $table->json('files')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('permohonanlayanans');
    }
};