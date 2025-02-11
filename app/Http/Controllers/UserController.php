<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);
    
        $user->update($request->all());
    
        return response()->json($user);
    }
    
    public function destroy(User $user)
    {
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully']);
    }
    
}


