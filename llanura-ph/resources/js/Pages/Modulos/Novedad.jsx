import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FormularioNovedad from '@/Components/novedades/FormularioNovedad';


export default function Novedad({ auth, usuarios }) {

    const nro_rol = auth.user.rol_id;

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [valorBoton, setValorBoton] = useState('nuevo mensaje');

    const alternarVista = () => {
        setMostrarTabla(!mostrarTabla);
        setMostrarFormulario(!mostrarFormulario);
        !mostrarFormulario ? setValorBoton('ver mensajes') : setValorBoton('nuevo mensaje');
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="m:px-6 lg:px-8 flex items-center justify-center font-semibold text-xl text-gray-800 leading-tight">LLANURA-PH</h2>}
        >
            <Head title="Novedades" />

            <div className="py-12 fondoDashBoard">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex justify-center">
                            <FormularioNovedad
                                auth={auth}
                                usuarios = {usuarios}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
