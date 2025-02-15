<?php

// app/Http/Controllers/JabatanController.php
namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JabatanController extends Controller
{
    public function index()
    {
        return response()->json(Jabatan::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jabatan' => 'required|string|unique:jabatan,nama_jabatan|max:255',
        ]);

        $jabatan = Jabatan::create($validated);
        return response()->json($jabatan, 201);
    }

    public function update(Request $request, Jabatan $jabatan)
    {
        $validated = $request->validate([
            'nama_jabatan' => ['required', 'string', 'max:255', Rule::unique('jabatan')->ignore($jabatan->id)],
        ]);

        $jabatan->update($validated);
        return response()->json($jabatan);
    }

    public function destroy(Jabatan $jabatan)
    {
        $jabatan->delete();
        return response()->json(null, 204);
    }
}
