import React, { useEffect, useState } from 'react';

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

import GestionComunicados from './GestionComunicados';
import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useForm } from '@inertiajs/react';

export default function TablaComunicados(props) {

    const {
        data, 
        setData, 
        post, 
        processing,
        errors,
        reset,
    } = useForm();

    const { mensajes, usuario } = props;

    const [mostrarIngreso, setMostrarIngreso] = useState(false);
    const [ingresos, setIngresos] = useState({});

    useEffect(() => {
        const initialIngresos = mensajes.reduce((acc, _, index) => {
            acc[index] = 'NO';
            return acc;
        }, {});
        setIngresos(initialIngresos);
    }, [mensajes]);

    const handleRadioChange = (index, value) => {
        setIngresos(prevState => ({
            ...prevState,
            [index]: value
        }));
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    Mensajes recibidos por {usuario.name}
                </Typography>
                {usuario.rol_id === 2 && (
                    <GestionComunicados
                        usuario={usuario}
                        mostrarIngreso={mostrarIngreso}
                        setMostrarIngreso={setMostrarIngreso}
                    />
                )}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nro.</b></TableCell>
                            <TableCell><b>Fecha dd/mm/aaaa</b></TableCell>
                            <TableCell><b>Origen</b></TableCell>
                            <TableCell><b>Asunto</b></TableCell>
                            <TableCell><b>Comunicado</b></TableCell>
                            {mostrarIngreso && (
                                <TableCell><b>Ingreso</b></TableCell>
                            )}
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
                                {mostrarIngreso && (
                                    <TableCell>
                                        <RadioGroup
                                            value={ingresos[index] || 'NO'}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        >
                                            <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                            <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                        </RadioGroup>

                                        {ingresos[index] === 'SI' && (
                                            <>
                                                <TextField
                                                    name='vehiculo'
                                                    label="vehiculo"                                                    
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                />

                                                <input hidden name='id' value={mensaje.id}/>

                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#007BFF',
                                                        color: '#ffffff',
                                                        '&:hover': {
                                                            backgroundColor: '#0056b3',
                                                        },
                                                        padding: '5px 10px',
                                                        borderRadius: '4px',
                                                    }}
                                                    onClick={() => { alert('enviar id: ' + mensaje.id) }}
                                                >
                                                    Aceptar
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
