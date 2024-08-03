import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const otorgarPermisos = () => {
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

export default function Notificaciones() {


    useEffect(() => {
        otorgarPermisos();        
    }, [])

    return (
        <Button
            variant='standard'
            onClick={sendNotification}
        >
            Notificacion
        </Button>
    );
}