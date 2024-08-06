<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\ResidenteController;
use App\Http\Controllers\PorteroController;
use App\Http\Controllers\ComunicacionesController;
use App\Http\Middleware\CheckRole;

use App\Http\Controllers\MailController;


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


Route::middleware(['auth', 'checkRole:1'])->group(function () {
    Route::get('/super-admin', [SuperAdminController::class, 'index']);
});

Route::middleware(['auth', 'checkRole:2'])->group(function () {
    Route::get('/residente', [ResidenteController::class, 'index']);
});

Route::middleware(['auth', 'checkRole:3'])->group(function () {
    Route::get('/portero', [PorteroController::class, 'index']);
});


Route::get('/send-mail', [MailController::class, 'sendMail']);

Route::post('/guardar-vehiculo', [ComunicadoController::class, 'guardarVehiculo']);

