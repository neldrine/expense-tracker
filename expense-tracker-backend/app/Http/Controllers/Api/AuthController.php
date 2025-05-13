<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request) {

        // validate email and password
        $request->validate([
            'name' => 'required|string',
            'password' => ['required', Password::min(8)],
        ]);

        // grab request variables
        $credentials = $request->only('name', 'password');

        // authenticate credentials against db
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Your email or password is incorrect.'], 401);
        }

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function user(Request $request) {
        return $request->user();
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfuly Logged out'], 200);
    }
}
