<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Dena Darmayanti',
            'email' => 'denadarmayanti@gmail.com',
            'password' => Hash::make('dena12345'),
        ]);
    }
}
