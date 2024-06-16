<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguridad extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'apellido', 'cedula', 'correo',
    ];

    // Métodos de acciones para Seguridad
    public function registrarIngreso(Visitante $visitante, array $datos)
    {
        return $visitante->ingresos()->create($datos);
    }

    public function verificarIdentidad(Visitante $visitante)
    {
        // Lógica para verificar identidad
    }

    // Otros métodos de acciones
}
