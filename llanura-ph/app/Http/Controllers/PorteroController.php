<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PorteroController extends Controller
{
    public function index()
    {
        return view('dashboards.portero');
    }
}
