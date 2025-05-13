<?php

namespace App\Http\Controllers\Api;

use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->expenses()->latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'required|string|in:Transport,Food,Utilities,Rent,Health,Education',
        ]);
        $expense = auth()->user()->expenses()->create($validated);
        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        // future refactor use guard/policy middleware
        if ($expense->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Not Found'
            ], 404);
        }

        return response()->json($expense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        // future refactor use guard/policy middleware
        if ($expense->user_id !== auth()->id()) {
            return response()->json(['message' => "Expense not found or does not belong to the authenticated user."], 404);
        }

        $expense->delete();
        return response()->json(['message' => 'Expense deleted'], 200);
    }
}
