<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comunicaciones;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\Events\Registered;
    
use App\Http\Controllers\NotificationController;
use App\Services\FirebaseService;

use App\Mail\ExampleMail;
use Illuminate\Support\Facades\Mail; // Importar la fachada Mail

class ComunicacionesController extends Controller
{
    //protected $factory = (new Factory)->withServiceAccount(storage_path('app/firebase-service-account.json'));

    public function create(): Response
    {
        $usuario = Auth::user()->usuario;

        $mensajes = $this->getComunicaciones($usuario);

        $userModel = new User();

        $todosUsuarios = User::all();     

        $torres = $userModel->getTorres();

        return Inertia::render('Modulos/Comunicados', [
            'mensajes' => $mensajes,
            'usuarios' => $todosUsuarios,  
            'torres' => $torres,          
        ]);
    }


    public function store(Request $request)
    {

        $firebase = new FirebaseService();
        
        $notificacion = new NotificationController($firebase);

        $prueba = [
            "token" => "cyQCpZskC3zydMcwafF38x:APA91bFik7JsHrO4WofUJFQGNj8YQPEpcnd-Usx4Kh14G5zSddEvi8lzeDSOyXg3GAYjVazyv8maBUYeguLMV1lDA-eJ7VPYtr2tH-xNoUY5EHKFYYLv5oE6cPkbMugVjBOcTZp0cI-l",
            "title" => "Test Notification",
            "body" => "This is a test notification from Laravel."
        ];

        $request->validate([
            'origen' => 'string',
            //'destinatarios' => 'required|exists:users,name',
            'asunto' => 'required|string|max:255',
            'comunicado' => 'required|string',
        ]);

        for( $i = 0; $i < count($request->destinatarios); $i++ ) {
            $comunicacion = Comunicaciones::create([
                'fecha' => now(),
                'origen' => $request->origen,
                'destinatario' => $request->destinatarios[$i],
                'asunto' => $request->asunto,
                'comunicado' => $request->comunicado,
            ]);   
        }

        $notificacion->send($prueba);

        //$this->sendMail($request->origen, $request->asunto,$request->comunicado);

        return redirect()->back()->with('success', 'Mensaje enviado exitosamente!');
    }

    public function getComunicaciones(?string $destinatario = null){
        $mensajes = Comunicaciones::where('destinatario', $destinatario)->get();
        return $mensajes->toArray();        
    }

    public function sendMail(String $origen, String $asunto, String $comunicado)
    {
        $details = [
            'title' => 'Correo desde Llanura-PH asunto:'.$asunto,
            'body' => $origen . 'te dice lo siguiente: '.$comunicado
        ];

        Mail::to('cristianmr23@gmail.com')->send(new ExampleMail($details));

        return 'Correo enviado';
    }

    public function guardarVehiculo(Request $request)
    {
        $request->validate([
            'comunicado_id' => 'required|exists:comunicaciones,id',
            'vehiculo' => 'required|string|max:255'
        ]);

        $comunicado = Comunicaciones::find($request->comunicado_id);
        $comunicado->vehiculo = $request->vehiculo;
        $comunicado->save();

        return response()->json(['message' => 'Vehiculo guardado exitosamente'], 200);
    }
}
