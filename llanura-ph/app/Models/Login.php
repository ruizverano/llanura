use Illuminate\Support\Facades\Auth;

public function login(Request $request)
{
    // lógica de autenticación

    $role = Auth::user()->rol_id;
    $redirectUrl = '';

    switch ($role) {
        case 1:
            $redirectUrl = '/super-admin';
            break;
        case 2:
            $redirectUrl = '/residente';
            break;
        case 3:
            $redirectUrl = '/portero';
            break;
        default:
            $redirectUrl = '/';
    }

    return response()->json(['redirectUrl' => $redirectUrl]);
}
