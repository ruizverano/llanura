<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User; 

class Comunicaciones extends Model
{
    use HasFactory;


    protected $fillable = [
        'fecha',
        'destinatario',
        'asunto',
        'comunicado'        
    ];

    public function enviar(){
        return $this->belongsTo(User::class, 'destinatario', 'name');
    }
}
