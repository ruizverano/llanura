import React, { useState, useEffect } from 'react';
import AdminDashboard from '@/Components/actores/AdminDashboard';
import PorteroDashboard from '@/Components/actores/PorteroDashboard';
import ResidenteDashboard from '@/Components/actores/ResidenteDashboard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    const nro_rol = auth.user.rol_id;    

    const [interfazAdmin, setInterfazAdmin] = useState(false);
    const [interfazPortero, setInterfazPortero] = useState(false);
    const [interfazResidente, setInterfazResidente] = useState(false);

    useEffect(() => {
        setInterfazAdmin(nro_rol === 1);
        setInterfazPortero(nro_rol === 2);
        setInterfazResidente(nro_rol === 3);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">LLANURA-PH</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{auth.user.name} está logeado</div>
                        
                        { interfazAdmin && (
                            <AdminDashboard
                                user={auth.user}
                            />
                        )}
                        
                        { interfazPortero && (
                            <PorteroDashboard
                                user={auth.user}
                            />
                        )}
                        
                        {interfazResidente && (
                            <ResidenteDashboard 
                                user={auth.user}
                            />
                        )}
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
