<?php

namespace App\Http\Controllers;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $messaging;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(storage_path('app/llanura-37340-firebase-adminsdk-rtyrt-36dc9393eb.json'));
        $this->messaging = $factory->createMessaging();
    }

    public function sendNotification(Request $request)
    {
        $token = $request->input('token');
        $title = $request->input('title');
        $body = $request->input('body');

        $notification = Notification::create($title, $body);
        $message = CloudMessage::withTarget('token', $token)
            ->withNotification($notification);

        $this->messaging->send($message);

        return response()->json(['status' => 'success'], 200);
    }

    public function saveToken(Request $request)
    {
        $token = $request->input('token');
        // Guarda el token en la base de datos para usarlo más tarde
        // Token::create(['token' => $token]);
        return response()->json(['status' => 'success'], 200);
    }
}
