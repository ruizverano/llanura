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
        alert('entra');
    }, [])

    return (
        <Button
        variant='contained'
        onClick={sendNotification}
        sx={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#333333',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            textTransform: 'none',  // Para que el texto no esté en mayúsculas
        }}
    >
        Notificacion
    </Button>
    );
}