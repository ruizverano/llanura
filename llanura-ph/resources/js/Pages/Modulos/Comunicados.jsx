import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FormularioComunicados from '@/Components/comunicados/FormularioComunicado';
import PrimaryButton from '@/Components/PrimaryButton';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    InputLabel,
} from '@mui/material';


export default function Comunicados({ auth, mensajes }) {

    const nro_rol = auth.user.rol_id;

    const [interfazAdmin, setInterfazAdmin] = useState(false);
    const [interfazPortero, setInterfazPortero] = useState(false);
    const [interfazResidente, setInterfazResidente] = useState(false);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

                        <TableContainer component={Paper}>
                            <InputLabel>Mensajes recibidos por {auth.user.name}</InputLabel>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro.</TableCell>
                                        <TableCell>Fecha dd/mm/aaaa</TableCell>
                                        <TableCell>Asunto</TableCell>
                                        <TableCell>Comunicado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mensajes.map((mensaje, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{mensaje.fecha}</TableCell>
                                            <TableCell>{mensaje.asunto}</TableCell>
                                            <TableCell>{mensaje.comunicado}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <PrimaryButton
                            onClick={() => setMostrarFormulario(!mostrarFormulario)}
                            className="ms-4">
                            Nuevo mensaje
                        </PrimaryButton>

                        {mostrarFormulario && (
                            <div className="flex justify-center">
                                <FormularioComunicados auth={auth} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
