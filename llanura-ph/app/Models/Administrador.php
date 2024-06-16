<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'apellido', 'cedula',
    ];

      // Métodos de acciones para Administradores
      public function crearUsuario(array $datos)
      {
          return Usuario::create($datos);
      }
  
      public function eliminarUsuario(Usuario $usuario)
      {
          return $usuario->delete();
      }
  
      // Otros métodos de acciones
}
