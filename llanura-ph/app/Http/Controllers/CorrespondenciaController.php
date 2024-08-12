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
    public function gestion(): Response {
        $usuario = Auth::user()->name;
    
        $paquetes = Correspondencia::getCorrespondencia();

        $userModel = new User();

        $usuarios = $userModel->getAllUsuarios();

        $todosUsuarios = User::all();   

        return Inertia::render ('Modulos/Correspondencia', [            
            'paquetes' => $paquetes,
            'usuarios' => $todosUsuarios,
            'gestion' => true,
        ]);
    }
    
    public function create(): Response {
        $usuario = Auth::user()->name;
    
        $paquetes = Correspondencia::getCorrespondencia();

        $userModel = new User();

        //$usuarios = $userModel->getAllUsuarios();

        $todosUsuarios = User::all();

        return Inertia::render ('Modulos/Correspondencia', [            
            'paquetes' => $paquetes,
            'usuarios' => $todosUsuarios,
            'gestion' => false,
        ]);
    }

    public function store(Request $request){

        $request->validate([            
            'portero' => 'required|string',
            'descripcion' => 'required|string|max:255',
            'origen' => 'required|string',
            //'destino' =>'required|string',
            'entregado' => 'required'
        ]);
        
        for( $i = 0; $i < count($request->destinatarios); $i++ ) {
            $correspondencia = Correspondencia::create([
                'fecha' => now(),
                'portero' => $request->portero,
                'descripcion'=> $request->descripcion,
                'origen'=> $request->origen,
                'destino'=> $request->destinatarios[$i],
                'entregado'=> $request->entregado,
            ]);    
        }
        
        return redirect()->back()->with('success', 'Registrado correctamente');
    }

    public function entregar (Request $request){
        $correspondencia = Correspondencia::find($request->input('id'));        
        $correspondencia->entregado = 1;
        $correspondencia->save();            
    }

}