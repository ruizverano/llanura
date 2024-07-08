import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FormularioCorrespondencia from '@/Components/correspondencia/FormularioCorrespondencia';
import PrimaryButton from '@/Components/PrimaryButton';
import TablaCorrespondencia from '@/Components/correspondencia/TablaCorrespondencia';




export default function Correspondencia({ auth, paquetes }) {

    const nro_rol = auth.user.rol_id;

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [valorBoton, setValorBoton] = useState('nuevo paquete');

    const alternarVista = () => {
        setMostrarTabla(!mostrarTabla);
        setMostrarFormulario(!mostrarFormulario);        
        !mostrarFormulario?setValorBoton('ver paquetes'):setValorBoton('nuevo paquete');
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
                            <TablaCorrespondencia
                                paquetes={paquetes}
                                usuario = {auth.user.name}
                            />
                        )}                        
                        
                        {mostrarFormulario && (
                            <div className="flex justify-center">
                                <FormularioCorrespondencia 
                                    auth={auth} 
                                />
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
