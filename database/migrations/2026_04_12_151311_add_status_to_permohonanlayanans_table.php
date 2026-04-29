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
        Schema::table('permohonanlayanans', function (Blueprint $table) {
            $table->enum('status', ['menunggu', 'diproses', 'disetujui', 'ditolak'])
                  ->default('menunggu')
                  ->after('kontak');
            $table->text('catatan_admin')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permohonanlayanans', function (Blueprint $table) {
            $table->dropColumn(['status', 'catatan_admin']);
        });
    }
};
