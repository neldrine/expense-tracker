<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// auth login
Route::post('/auth/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

// auth api middleware group
Route::middleware('auth:api')->group(function () {

    Route::get('/auth/user', [App\Http\Controllers\Api\AuthController::class, 'user']);
    Route::post('/auth/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);

    Route::get('/expenses', [App\Http\Controllers\Api\ExpenseController::class, 'index']);
    Route::get('/expenses/{expense}', [App\Http\Controllers\Api\ExpenseController::class, 'show']);
    Route::post('/expenses', [App\Http\Controllers\Api\ExpenseController::class, 'store']);
    Route::delete('/expenses/{expense}', [App\Http\Controllers\Api\ExpenseController::class, 'destroy']);

});


