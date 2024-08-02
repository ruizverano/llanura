import React, { useEffect } from 'react';
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

import { requestNotificationPermission, onMessageListener } from '../../firebase';

export default function TablaComunicados({ usuario, mensajes }) {

    useEffect(() => {
        requestNotificationPermission().then((token) => {
          if (token) {
            // Envía el token al backend para almacenar
            fetch('http://localhost:8000/api/save-token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({ token: 'd-2xcs72cu1kzCiEZEBAdh:APA91bG_gtxi1z39mt3h0Q79jw6qyVgunz1l1d7PzzehuF2w3TqgSctShSnEW4cepFdO_B_NfYMlF1gAU_bs43aT1xoETq5-zP8ZDhmi27kHHVq5WUF7tNN18VZ52Xd1rbK8vnL8MWD5' })
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Error al enviar el token al servidor');
                }
                return response.json();
              })
              .then(data => {
                console.log('Token almacenado en el servidor:', data);
              })
              .catch(err => {
                console.error('Error al enviar el token al servidor:', err);
              });              
          }
        });
    
        onMessageListener()
          .then((payload) => {
            console.log('Mensaje recibido: ', payload);
            // Muestra la notificación o realiza alguna acción
          })
          .catch((err) => console.log('Error al recibir mensaje: ', err));
      }, []);

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
