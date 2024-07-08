<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comunicaciones;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\Events\Registered;

class ComunicacionesController extends Controller
{
    public function create(): Response
    {
        $usuario = Auth::user()->name;

        $mensajes = $this->getComunicaciones($usuario);

        return Inertia::render('Modulos/Comunicados', [
            'mensajes' => $mensajes,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'origen' => 'string',
            'destinatario' => 'required|exists:users,name',
            'asunto' => 'required|string|max:255',
            'comunicado' => 'required|string',
        ]);

        $comunicacion = Comunicaciones::create([
            'fecha' => now(),
            'origen' => $request->origen,
            'destinatario' => $request->destinatario,
            'asunto' => $request->asunto,
            'comunicado' => $request->comunicado,
        ]);

        return redirect()->back()->with('success', 'Mensaje enviado exitosamente!');
    }

    public function getComunicaciones(?string $destinatario = null){        
        $mensajes = Comunicaciones::where('destinatario', $destinatario)->get();
        return $mensajes->toArray();        
    }
}
