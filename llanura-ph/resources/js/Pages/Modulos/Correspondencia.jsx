import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FormularioCorrespondencia from '@/Components/correspondencia/FormularioCorrespondencia';
import PrimaryButton from '@/Components/PrimaryButton';
import PaquetesRecibidos from '@/Components/correspondencia/TablaCorrespondencia';


export default function Correspondencia(props) {

    const { auth, paquetes, usuarios, gestion } = props;

    const nro_rol = auth.user.rol_id;

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [valorBoton, setValorBoton] = useState('nuevo paquete');

    const alternarVista = () => {
        setMostrarTabla(!mostrarTabla);
        setMostrarFormulario(!mostrarFormulario);
        !mostrarFormulario ? setValorBoton('ver paquetes') : setValorBoton('nuevo paquete');
    }

    console.log('usuarios');
    console.log(usuarios);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="m:px-6 lg:px-8 flex items-center justify-center font-semibold text-xl text-gray-800 leading-tight">LLANURA-PH</h2>}
        >
            <Head title="Comunicaciones" />

            <div className="py-12 fondoDashBoard">
                <div className="max-w-3xl mx-auto sm:px-12 lg:px-12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {mostrarTabla && (
                            <PaquetesRecibidos
                                gestion={gestion}
                                paquetes={paquetes}
                                usuario={auth.user}
                            />
                        )}

                        {mostrarFormulario && (
                            <div className="flex justify-center">
                                <FormularioCorrespondencia
                                    auth={auth}
                                    usuarios={usuarios}
                                />
                            </div>
                        )}

                        {!gestion && nro_rol === 2 &&
                            <PrimaryButton
                                onClick={alternarVista}
                                className="ms-4"
                            >
                                {valorBoton}
                            </PrimaryButton>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
