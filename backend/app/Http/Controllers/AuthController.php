<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Récupérer les données d'identification du corps de la requête
        $credentials = $request->only('email', 'password');
    
        // Vérifier si les données d'identification sont correctes
        if (!$token = JWTAuth::attempt($credentials)) {
            // Si les informations d'identification sont incorrectes
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // L'utilisateur est connecté, renvoyer le token
        return response()->json(['token' => $token], 200);
    }
}