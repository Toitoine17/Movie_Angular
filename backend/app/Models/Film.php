<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = ['name', 'realisateur', 'annee', 'synopsis', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
