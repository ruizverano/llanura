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


    public function getCorrespondenciaPorUsuario(?string $destinatario = null){
        $paquetes = Correspondencia::where('destino', $destinatario)->get();
        return $paquetes->toArray();
    }

    public function getCorrespondencia(){
        $paquetes = Correspondencia::where('destino', $destinatario)->get();
        return $paquetes->toArray();
    }
}
