<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Correspondencia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class CorrespondenciaController extends Controller
{
    public function create(): Response {
        $usuario = Auth::user()->name;

        $paquetes = Correspondencia::getCorrespondenciaPorUsuario($usuario);

        $userModel = new User();

        $usuarios = $userModel->getAllUsuarios();

        return Inertia::render ('Modulos/Correspondencia', [            
            'paquetes' => $paquetes,
            'usuarios' => $usuarios,
        ]);
    }

    public function store(Request $request){

        $request->validate([            
            'portero' => 'required|string',
            'descripcion' => 'required|string|max:255',
            'origen' => 'required|string',
            'destino' =>'required|string',
            'entregado' => 'required'
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

}
