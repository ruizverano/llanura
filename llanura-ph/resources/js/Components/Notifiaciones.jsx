import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Notificaciones() {

    const [permission, setPermission] = useState(Notification.permission);
    
    const otorgarPermisos = () => {        
    
        if ('Notification' in window) {
            // Solicitar permiso para notificaciones si no ha sido otorgado o denegado
            if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    setPermission(permission);
                    if (permission === 'granted') {
                        alert('Notificaciones permitidas');
                    } else {
                        alert('Notificaciones denegadas');
                    }
                });
            } else {
                setPermission(Notification.permission);
            }
        } else {
            alert('Notificaciones no soportadas en este navegador');
        }
    }
    
    const sendNotification = () => {
        if (permission === 'granted') {
            new Notification('¡Hola!', {
                body: 'Esto es una notificación de prueba.',
                icon: 'https://example.com/icon.png'
            });
        } else {
            console.log('Permiso para notificaciones no concedido');
        }
    };
    
    useEffect(() => {
        otorgarPermisos();
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