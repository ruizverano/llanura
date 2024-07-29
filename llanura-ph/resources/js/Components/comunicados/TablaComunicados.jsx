import React, {useEffect} from 'react';
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

import { messaging } from '../../firebase';

export default function TablaComunicados({ usuario, mensajes }) {

    useEffect(() => {       
        console.log(messaging.logEvents);
        // messaging.requestPermission()
        // .then(() => {
        //     console.log('Permiso de notificacion otorgado');
        //     return messaging.getToken();
        // })
        // .then((token)=> {
        //     console.log('FCM Token: ', token);
        //     //envia el token al servidor para suscribir al usuario a las notificaciones push
        // })
        // .catch((err) =>{
        //     console.log('no hubo permiso de notificacion ', err);
        // });
    },[]);

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
