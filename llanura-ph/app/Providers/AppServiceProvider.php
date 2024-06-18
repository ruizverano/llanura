<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //$this->registerPolicies();

        Gate::define('crear-usuarios', function ($user) {
            return $user->rol_id == 1; // Administrador
        });

        Gate::define('programar-reuniones', function ($user) {
            return $user->rol_id == 1; // Administrador
        });

        Gate::define('administrar-perfiles', function ($user) {
            return $user->rol_id == 1; // Administrador
        });

        Gate::define('create-registros-porteria', function ($user) {
            return in_array($user->rol_id, [1, 2]); // Portero y Administrador
        });

        Gate::define('enviar-notificaciones', function ($user) {
            return in_array($user->rol_id, [1, 2]); // Portero y Administrador
        });

        Gate::define('recibir-notificaciones', function ($user) {
            return in_array($user->rol_id, [1, 3]);  // Residente y Administrador
        });

        Gate::define('registrar-novedades', function ($user) {
            return $user->rol_id == 3; // Residente
        });

        Gate::define('confirmar-asistencia', function ($user) {
            return $user->rol_id == 3; // Residente
        });
    }
}
