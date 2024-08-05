import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

export default function GestionComunicados(props) {
    const { usuario, mostrarIngreso, setMostrarIngreso } = props;

    const [mostrarGestor, setMostrarGestor] = useState(false);

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
                onClick={() => { setMostrarIngreso(!mostrarIngreso) }}
            >
                Gestionar
            </Button>            
        </>
    );
}
