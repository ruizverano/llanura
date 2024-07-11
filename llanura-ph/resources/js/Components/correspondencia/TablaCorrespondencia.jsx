import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography
} from '@mui/material';
import PrimaryButton from '../PrimaryButton';

export default function PaquetesRecibidos({ usuario, paquetes }) {
    const [mostrarGestionar, setMostrarGestionar] = useState(false);

    const toggleMostrarGestionar = () => {
        setMostrarGestionar(!mostrarGestionar);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    Paquetes recibidos por {usuario}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nro.</b></TableCell>
                            <TableCell><b>Fecha dd/mm/aaaa</b></TableCell>
                            <TableCell><b>Portero</b></TableCell>
                            <TableCell><b>Descripción</b></TableCell>
                            <TableCell><b>Origen</b></TableCell>
                            <TableCell><b>Destino</b></TableCell>
                            <TableCell><b>¿Entregado?</b></TableCell>
                            {mostrarGestionar && (
                                <TableCell><b>Gestionar</b></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paquetes.map((paquete, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{paquete.fecha}</TableCell>
                                <TableCell>{paquete.portero}</TableCell>
                                <TableCell>{paquete.descripcion}</TableCell>
                                <TableCell>{paquete.origen}</TableCell>
                                <TableCell>{paquete.destino}</TableCell>
                                <TableCell>{paquete.entregado === 1 ? 'SI' : 'NO'}</TableCell>
                                {mostrarGestionar && (
                                    <TableCell>
                                        <PrimaryButton
                                            disabled={paquete.entregado === 1}
                                            className="ms-4"
                                        >
                                            Entregar
                                        </PrimaryButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PrimaryButton onClick={toggleMostrarGestionar} className="mt-4">
                {mostrarGestionar ? 'Ocultar Gestionar' : 'Mostrar Gestionar'}
            </PrimaryButton>
        </div>
    );
}
