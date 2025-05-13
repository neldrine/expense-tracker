<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::query()->delete();

        $users = User::all();

        $pairs = [
            ['description' => 'Uber', 'category' => 'Transport'],
            ['description' => 'Nandos', 'category' => 'Food'],
            ['description' => 'British Gas', 'category' => 'Utilities'],
            ['description' => 'Rent', 'category' => 'Rent'],
            ['description' => 'Boots', 'category' => 'Health'],
        ];

        foreach (range(1, 10) as $i) {
            $item = $pairs[array_rand($pairs)];
            $users->random()->expenses()->create([
                'description' => $item['description'],
                'amount' => rand(500, 5000) / 100,
                'category' => $item['category'],
            ]);
        }
    }
}
