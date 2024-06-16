import { Link, Head } from '@inertiajs/react';
import Login from './Auth/Login';

export default function Principal({ auth, canResetPassword, status}) {
   
    return (
        <>
            <Head title="Bienvenidos" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50"> 
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] bg-blue-900 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>                                      
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Registrar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-2">
                            <Login
                                status={status}
                                canResetPassword={canResetPassword}
                            />
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            <p>© 2024 Llanura P.H. Todos los derechos reservados. Juan Carlos Alvarado Garzón</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
