<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\PermohonanLayanan;
use App\Models\PendaftaranKegiatan;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {

        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'auth' => [
                'user' => [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ],
            ],

            // // Riwayat permohonan layanan milik user yang login
            // 'permohonan_layanan' => PermohonanLayanan::where('user_id', $user->id)
            //     ->latest()
            //     ->get(),

            // ✅ PERMOHONAN LAYANAN (pakai email karena tidak ada user_id)
            'permohonan_layanan' => PermohonanLayanan::where('email', $user->email)
                ->latest()
                ->get(),

            // // Riwayat pendaftaran kegiatan milik user yang login
            // 'pendaftaran_kegiatan' => PendaftaranKegiatan::with('kegiatan')
            //     ->where('user_id', $user->id)
            //     ->latest()
            //     ->get(),
            
            // ✅ PENDAFTARAN KEGIATAN
            'pendaftaran_kegiatan' => PendaftaranKegiatan::with('kegiatan')
                ->where('user_id', $user->id) // pastikan ini ada di tabel
                ->latest()
                ->get(),
        ]);
    }
    
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
