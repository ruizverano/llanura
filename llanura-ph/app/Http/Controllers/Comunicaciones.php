<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Comunicaciones extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Modulos/comunicados');
    }
}
