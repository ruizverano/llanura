<?php

namespace App\Http\Controllers;

use App\Models\Novedad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

use App\Models\Comunicaciones;

class NovedadController extends Controller
{

    public function create(): Response {
        $usuario = Auth::user()->name;

        $todosUsuarios = User::all();
    
        //$novedades = Correspondencia::getCorrespondencia();

        //$userModel = new User();

        //$usuarios = $userModel->getAllUsuarios();

        return Inertia::render ('Modulos/Novedad', [
            'usuarios' => $todosUsuarios
        ]);
    }

    public function store(Request $request){   
        
        $usuario = Auth::user()->name;

        $request->validate([                        
            'novedad' =>'required|string',             
            'origen' => 'string',
            //'destinatario' => 'required|exists:users,name',
        ]);

        $correspondencia = Novedad::create([            
            'origen'=> $usuario,
            'novedad'=> $request->novedad,            
        ]);

        for( $i = 0; $i < count($request->destinatarios); $i++ ) {
            $comunicacion = Comunicaciones::create([
                'fecha' => now(),
                'origen' => $request->origen,
                'destinatario' => $request->destinatarios[$i],
                'asunto' => 'novedad',
                'comunicado' => $request->novedad,
            ]);   
        }

        //$this->comunicarAdministrador($request);

        return redirect()->back()->with('success', 'Registrado correctamente');
    }

    public function comunicarAdministrador(Request $request)
    {             
        $usuario = Auth::user()->name;       
                   
        return redirect()->back()->with('success', 'Mensaje enviado exitosamente!');
    }
}
