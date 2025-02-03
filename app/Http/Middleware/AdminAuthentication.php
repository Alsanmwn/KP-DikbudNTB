<?php


// app/Http/Middleware/AdminAuthentication.php


namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('admin')->check()) {
            if ($request->header('X-Inertia')) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }
           
            return redirect()->route('admin.login');
        }


        return $next($request);
    }
}
