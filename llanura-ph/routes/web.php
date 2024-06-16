<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\ResidenteController;
use App\Http\Controllers\PorteroController;
use App\Http\Middleware\CheckRole;

/* Route::get('/', function () {
    return Inertia::render('Principal', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
}); */

Route::get('/', function () {
    return redirect('/login');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


// API routes for role-based access
Route::middleware(['auth', CheckRole::class.':1'])->group(function () {
    Route::get('/api/super-admin', [SuperAdminController::class, 'index']);
});

Route::middleware(['auth', CheckRole::class.':2'])->group(function () {
    Route::get('/api/residente', [ResidenteController::class, 'index']);
});

Route::middleware(['auth', CheckRole::class.':3'])->group(function () {
    Route::get('/api/portero', [PorteroController::class, 'index']);
});
