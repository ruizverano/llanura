import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,    
} from '@mui/material';
import BotonEnlace from '../BotonEnlace';

export default function TablaUsuarios(props) {

    const { usuarios } = props;

    console.log(usuarios);

    return (
        <div>
            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    {'Usuarios registrados hasta la fecha'}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nro.</b></TableCell>
                            <TableCell><b>name</b></TableCell>
                            <TableCell><b>correo</b></TableCell>
                            <TableCell><b>rol_id</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{usuario.name}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>
                                    {usuario.rol_id===1 ? 
                                    "Administrador": 
                                    usuario.rol_id===2 ? 
                                    "Portero": "Residente"}
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}