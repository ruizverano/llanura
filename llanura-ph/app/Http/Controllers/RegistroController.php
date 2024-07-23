<?php

namespace App\Http\Controllers;

use App\Models\Registro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class RegistroController extends Controller
{
    public function create(): Response {
        $usuario = Auth::user()->name;
    
        //$registros = Correspondencia::getCorrespondencia();

        //$userModel = new User();

        //$usuarios = $userModel->getAllUsuarios();

        return Inertia::render ('Modulos/Registro');
    }

    public function store(Request $request){

        $usuario = Auth::user()->name;

        $request->validate([                        
            'registro' =>'required|string',            
        ]);

        $correspondencia = Registro::create([            
            'origen'=> $usuario,
            'registro'=> $request->registro,            
        ]);

        return redirect()->back()->with('success', 'Registrado correctamente');
    }
}
