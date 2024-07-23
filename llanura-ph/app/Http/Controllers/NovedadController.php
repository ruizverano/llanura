<?php

namespace App\Http\Controllers;

use App\Models\Novedad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class NovedadController extends Controller
{
    
    public function create(): Response {
        $usuario = Auth::user()->name;
    
        //$novedades = Correspondencia::getCorrespondencia();

        //$userModel = new User();

        //$usuarios = $userModel->getAllUsuarios();

        return Inertia::render ('Modulos/Novedad');
    }

    public function store(Request $request){

        $usuario = Auth::user()->name;
    

        $request->validate([                        
            'novedad' =>'required|string',            
        ]);

        $correspondencia = Novedad::create([            
            'origen'=> $usuario,
            'novedad'=> $request->novedad,            
        ]);

        return redirect()->back()->with('success', 'Registrado correctamente');
    }
}
