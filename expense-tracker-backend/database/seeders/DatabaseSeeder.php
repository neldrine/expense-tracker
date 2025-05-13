<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // clear previous users and expenses
        User::query()->delete();
        Expense::query()->delete();

        // insert example data
        $this->call(UserSeeder::class);
        $this->call(ExpenseSeeder::class);
    }
}
