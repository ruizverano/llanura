<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FirebaseService;

use App\Mail\TestMail;
use Illuminate\Support\Facades\Mail;

class NotificationController extends Controller
{
    protected $firebase;

    public function __construct(FirebaseService $firebase)
    {
        $this->firebase = $firebase;
    }

    public function send(array $request)
    {
        $token = $request['token'] ?? null;
        $title = $request['title'] ?? null;
        $body = $request['body'] ?? null;

        $this->firebase->sendNotification($token, $title, $body);

        $this->sendEmail();

        return response()->json(['status' => 'success']);
    }

    public function sendEmail()
    {
        $data = [
            'title' => 'Test Email Title',
            'body' => 'This is the body of the test email.',
        ];

        Mail::to('cristianmr30@hotmail.com')->send(new TestMail($data));
    }
}
