<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// auth login
Route::post('/auth/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

// auth api middleware group
Route::middleware('auth:api')->group(function () {

    Route::get('/user', [App\Http\Controllers\Api\AuthController::class, 'user']);
    Route::post('/auth/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);

});


