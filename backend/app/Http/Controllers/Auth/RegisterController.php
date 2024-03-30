<?php

// app/Http/Controllers/Auth/RegisterController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        // Création de l'utilisateur
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        // Génération du token d'API
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retourner une réponse
        return response()->json(['user' => $user, 'token' => $token], 201);
    }
}
