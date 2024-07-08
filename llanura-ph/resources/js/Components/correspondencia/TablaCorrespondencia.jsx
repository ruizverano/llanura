import React from 'react';
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

export default function PaquetesRecibidos({ usuario, paquetes }) {
    return (
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paquetes.map((mensaje, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{mensaje.fecha}</TableCell>
                            <TableCell>{mensaje.portero}</TableCell>
                            <TableCell>{mensaje.descripcion}</TableCell>
                            <TableCell>{mensaje.origen}</TableCell>
                            <TableCell>{mensaje.destino}</TableCell>
                            <TableCell>{mensaje.entregado}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
