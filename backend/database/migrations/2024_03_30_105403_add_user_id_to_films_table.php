<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToFilmsTable extends Migration
{
    public function up()
    {
        Schema::table('films', function (Blueprint $table) {
            // Vérifie si la colonne 'user_id' n'existe pas déjà
            if (!Schema::hasColumn('films', 'user_id')) {
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
            }
        });
    }

    public function down()
    {
        Schema::table('films', function (Blueprint $table) {
            // Supprime la contrainte de clé étrangère et la colonne 'user_id'
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}
