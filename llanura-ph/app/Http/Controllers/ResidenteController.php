<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResidenteController extends Controller
{
    public function index()
    {
        return view('dashboards.residente');
    }
}
