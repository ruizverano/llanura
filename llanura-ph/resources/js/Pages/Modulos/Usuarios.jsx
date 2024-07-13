import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TablaUsuarios from '@/Components/usuarios/TablaUsusarios';
import Register from '../Auth/Register';
import FormularioUsuario from '@/Components/usuarios/FormularioCorrespondencia';


export default function Usuarios({ usuarios, auth }) {

    const nro_rol = auth.user.rol_id;

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [valorBoton, setValorBoton] = useState('nuevo usuario');

    const alternarVista = () => {
        setMostrarTabla(!mostrarTabla);
        setMostrarFormulario(!mostrarFormulario);
        !mostrarFormulario ? setValorBoton('ver usuarios') : setValorBoton('nuevo usuario');
    }

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
            header={<h2 className="m:px-6 lg:px-8 flex items-center justify-center font-semibold text-xl text-gray-800 leading-tight">LLANURA-PH</h2>}
        >
            <Head title="Comunicaciones" />

            <div className="py-12 fondoDashBoard">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {mostrarTabla && (
                            <TablaUsuarios                           
                                usuarios={usuarios}
                            />
                        )}

                        {mostrarFormulario && (
                            <div className="flex justify-center">
                                {/* <Register
                                    auth={auth}
                                    usuarios = {usuarios}
                                /> */}
                                <FormularioUsuario/>
                            </div>
                        )}

                        <PrimaryButton
                            onClick={alternarVista}
                            className="ms-4"
                        >
                            {valorBoton}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
