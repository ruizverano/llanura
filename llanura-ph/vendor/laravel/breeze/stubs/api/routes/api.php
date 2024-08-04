<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NotificationController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::post('/send-notification', [NotificationController::class, 'sendNotification']);
// Route::post('/api/save-token', [NotificationController::class, 'saveToken']);

Route::post('/notification/send', [NotificationController::class, 'send']);