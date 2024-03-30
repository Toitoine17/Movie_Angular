<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmsController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', 'AuthController@logout');
});
Route::get('/films', [FilmsController::class, 'index']);
Route::post('/films', [FilmsController::class, 'store']);
Route::post('register', [RegisterController::class, 'register']);