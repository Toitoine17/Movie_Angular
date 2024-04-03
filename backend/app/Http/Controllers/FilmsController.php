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
        $user = Auth::user();

        if ($user) {
            $film = new Film();
            $film->title = $request->input('title');
            $film->director = $request->input('director');
            $film->year = $request->input('year');
            $film->synopsis = $request->input('synopsis');
            $film->user_id = $user->id;
            
    
            $film->save();
    
            return response()->json($film, 201);
        } else {
          
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

}
