<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correspondencia extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha',
        'portero',
        'descripcion',
        'origen',
        'destino',
        'entregado'
    ];
}
