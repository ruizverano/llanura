<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FirebaseService
{
    protected $firebaseUrl;
    protected $firebaseServerKey;

    public function __construct()
    {
        $this->firebaseUrl = 'https://fcm.googleapis.com/fcm/send';
        $this->firebaseServerKey = env('FIREBASE_SERVER_KEY');
    }

    public function sendNotification($token, $title, $body)
    {
        $response = Http::withHeaders([
            'Authorization' => 'key=' . $this->firebaseServerKey,
            'Content-Type' => 'application/json',
        ])->post($this->firebaseUrl, [
            'to' => $token,
            'notification' => [
                'title' => $title,
                'body' => $body,
            ],
        ]);

        return $response->json();
    }
}
