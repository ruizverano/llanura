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

export default function TablaComunicados({ usuario, mensajes }) {
    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                Mensajes recibidos por {usuario}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Nro.</b></TableCell>
                        <TableCell><b>Fecha dd/mm/aaaa</b></TableCell>
                        <TableCell><b>Origen</b></TableCell>
                        <TableCell><b>Asunto</b></TableCell>
                        <TableCell><b>Comunicado</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mensajes.map((mensaje, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{mensaje.fecha}</TableCell>
                            <TableCell>{mensaje.origen}</TableCell>
                            <TableCell>{mensaje.asunto}</TableCell>
                            <TableCell>{mensaje.comunicado}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
