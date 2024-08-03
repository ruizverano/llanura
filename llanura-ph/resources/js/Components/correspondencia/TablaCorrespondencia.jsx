import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Grid
} from '@mui/material';
import BotonEnlace from '../BotonEnlace';
import DangerButton from '../DangerButton';

export default function PaquetesRecibidos(props) {

    const { usuario, paquetes, gestion } = props;
    
    const notificaciones = () => {
        if ('Notification' in window) {
            // Solicitar permiso para notificaciones
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notificaciones permitidas');
              } else {
                console.log('Notificaciones denegadas');
              }
            });
          } else {
            console.log('Notificaciones no soportadas en este navegador');
          }
    }

    const sendNotification = () => {
        if (Notification.permission === 'granted') {
          new Notification('¡Hola!', {
            body: 'Esto es una notificación de prueba.',
            icon: 'https://example.com/icon.png'
          });
        } else {
          console.log('Permiso para notificaciones no concedido');
        }
      };

      useEffect(()=>{
        notificaciones();
      }, []);

    return (
        <div>
            <button onClick={sendNotification}>Enviar Notificación</button>
            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    {gestion ? `Paquetes recibidos, puede gestionar la entrega con el respectivo Botón` : `Paquetes recibidos por ${usuario}`}
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
                            {gestion && (
                                <TableCell><b>Gestionar</b></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paquetes.filter(paquete => gestion || paquete.destino === usuario).map((paquete, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{paquete.fecha}</TableCell>
                                <TableCell>{paquete.portero}</TableCell>
                                <TableCell>{paquete.descripcion}</TableCell>
                                <TableCell>{paquete.origen}</TableCell>
                                <TableCell>{paquete.destino}</TableCell>
                                <TableCell>{paquete.entregado === 1 ? 'SI' : 'NO'}</TableCell>
                                {gestion && (
                                    <TableCell>
                                        {paquete.entregado === 0 && (
                                            <BotonEnlace 
                                                tipo={"boton-enlace"} 
                                                method="post"
                                                href={route('entregar',[paquete])} 
                                                as="button"
                                                texto ={"Entregar"}
                                            />
                                        )}                                        
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}