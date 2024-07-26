<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comunicaciones;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\Events\Registered;

use App\Notifications\NewMessageNotification;

class ComunicacionesController extends Controller
{    

    public function create(): Response    
    {
        $userModel = new User();

        $usuario = Auth::user()->name;

        $mensajes = $this->getComunicaciones($usuario);        

        $usuarios = $userModel->getAllUsuarios();        

        return Inertia::render('Modulos/Comunicados', [
            'mensajes' => $mensajes,
            'usuarios' => $usuarios,
        ]);
    }


    public function store(Request $request)
    {

        $userModel = new User();

        
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

          $destinatario = User::where('name', $request->destinatario)->first();
        $userModel->notify(new NewMessageNotification($request->comunicado));//probando notificacion push

        return redirect()->back()->with('success', 'Mensaje enviado exitosamente!');
    }

    public function getComunicaciones(?string $destinatario = null){        
        $mensajes = Comunicaciones::where('destinatario', $destinatario)->get();
        return $mensajes->toArray();        
    }


    public function storeToken(Request $request)
    {
        $request->validate([
            'token' => 'required'
        ]);

        auth()->user()->pushNotificationTokens()->create([
            'token' => $request->token
        ]);

        return response()->json(['message' => 'Token guardado con éxito']);
    }


    public function sendPushNotification($user, $message)
    {
        $tokens = $user->pushNotificationTokens->pluck('token')->toArray();

        foreach ($tokens as $token) {
            // Lógica para enviar la notificación usando el token
            $this->sendToFirebase($token, $message);
        }
    }

    protected function sendToFirebase($token, $message)
    {
        $serverKey = 'your-server-key';
        $data = [
            'to' => $token,
            'notification' => [
                'title' => 'Nuevo Mensaje',
                'body' => $message,
            ],
        ];

        $headers = [
            'Authorization: key=' . $serverKey,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }


}
