<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Correspondencia;

class CorrespondenciaController extends Controller
{
    public function create(): Response {
        $usuario = Auth::user()->name;

        $paquetes = $this->getCorrespondencia($usuario);

        return Intertia::render ('Modulos/Correspondencia', [
            'prueba'=> $usuario,
            'paquetes' => $paquetes
        ]);
    }

    public function store(Request $request){

        $request->validate([            
            'portero' => 'required|string',
            'descripcion' => 'required|string|max:255',
            'origen' => 'required|string',
            'destino' =>'required|string',
            'entregado' => 'required|string'
        ]);

        $correspondencia = Correspondencia::create([
            'fecha' => now(),
            'portero' => $request->portero,
            'descripcion'=> $request->descripcion,
            'origen'=> $request->origen,
            'destino'=> $request->destino,
            'entregado'=> $request->entregado,
        ]);

        return redirect()->back()->with('success', 'Registrado correctamente');
    }

    public function getCorrespondencia(?string $destinatario = null){
        $paquetes = Correspondencia::where('destinatario', $destinatario)->get();
        return $paquetes-toArray();
    }
}
