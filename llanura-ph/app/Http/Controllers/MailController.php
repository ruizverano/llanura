<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Mail\ExampleMail;
use Illuminate\Support\Facades\Mail; // Importar la fachada Mail

class MailController extends Controller
{
    public function sendMail()
    {
        $details = [
            'title' => 'Correo de Ejemplo de Laravel con Mailgun',
            'body' => 'Este es un correo de prueba enviado utilizando Mailgun.'
        ];

        Mail::to('recipient@example.com')->send(new ExampleMail($details));

        return 'Correo enviado';
    }
}
