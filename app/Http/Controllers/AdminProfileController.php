<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;


class AdminProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Admin/Profile', [
            'admin' => $request->user(),
        ]);
    }


    public function update(Request $request)
    {
        $admin = $request->user();


        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:admins,email,'.$admin->id],
            'current_password' => ['required_with:password', 'current_password'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);


        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }


        $admin->update($validated);


        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
