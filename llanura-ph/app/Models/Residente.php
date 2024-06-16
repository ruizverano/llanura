<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Residente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'apellido', 'cedula', 'correo',
    ];

        // Métodos de acciones para Residentes
        public function reservarAreaComun(AreaComun $area, array $datos)
        {
            return $area->reservaciones()->create($datos);
        }
    
        public function actualizarPerfil(array $datos)
        {
            return $this->update($datos);
        }
    
        // Otros métodos de acciones
}
