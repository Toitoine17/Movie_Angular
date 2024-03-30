<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;
use Illuminate\Support\Facades\Auth;

class FilmsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $films = $user->films;
        return response()->json($films);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'annee' => 'required',
            'realisateur' => 'required',
            'synopsis' => 'required',
            
        ]);

        $user = Auth::user();
        $film = new Film($request->all());
        $user->films()->save($film);

        return response()->json($film, 201);
    }


}
