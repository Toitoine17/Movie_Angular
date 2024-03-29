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
        if (Auth::attempt($credentials)) {
            // L'utilisateur est connecté
            $user = Auth::user();
            $token = $user->createToken('TokenName')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
    
        // Si les informations d'identification sont incorrectes
        return response()->json(['error' => 'Unauthoriz ed'], 401);
    }
    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}