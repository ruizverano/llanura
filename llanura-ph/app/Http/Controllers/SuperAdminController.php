<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Response;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    public function index():Response
    {
        return Inertia::render ('Modulos/Usuarios', [
            'usuarios' => User::all()
        ]);
    }
}
