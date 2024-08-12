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

import axios from 'axios';

export default function TablaComunicados(props) {

    const { mensajesEntrantes, usuario, mensajesSalidos } = props;
    
    const {
        data,        
        setData,                
        reset,
    } = useForm();    

    const [mostrarIngreso, setMostrarIngreso] = useState(false);
    const [ingresos, setIngresos] = useState({});

    const[mensajes, setMensajes] = useState([]);

    const [mostrarMensajesEntrantes, setMostrarMensajesEntrantes] = useState(true);

    const [btnMensajes, setBtnMensajes] = useState('');

    const [etiqueta, setEtiqueta] = useState('');

    const resetear = () => {
        const initialIngresos = mensajes.reduce((acc, _, index) => {
            acc[index] = 'NO';
            return acc;
        }, {});
        setIngresos(initialIngresos);
    }

    useEffect(() => {
       resetear();
    //    console.log(mensajes);
    }, [mensajes]);

    const handleRadioChange = (index, value) => {
        setIngresos(prevState => ({
            ...prevState,
            [index]: value
        }));
    };

    useEffect(()=>{
        if(mostrarMensajesEntrantes){
            setMensajes(mensajesEntrantes);
            setBtnMensajes('Ver Salientes');
            setEtiqueta(`Mensajes recibidos por ${usuario.usuario}`);
        }else{
            setMensajes(mensajesSalidos);
            setBtnMensajes('Ver Entrantes');
            setEtiqueta(`Mensajes enviados por ${usuario.usuario}`);
        }        
    },[mostrarMensajesEntrantes]);

    const handleGuardarVehiculo = (id) => {
        axios.post('/guardar-vehiculo', { comunicado_id: id, vehiculo: data.vehiculo })
            .then(response => {
                alert(response.data.message, ' registrado ', data.vehiculo);
                reset('vehiculo','ingreso');
                resetear();
                window.location.reload();
            })
            .catch(error => {
                alert('Hubo un error guardando el vehículo', error);
            });
    };

    return (
        <>
            <Button
                sx={{
                    backgroundColor: '#0099ff',
                    color: 'white',
                    borderRadius: '4px',
                    border: '1px solid lightblue',
                    padding: '4px 8px',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: 'lightcyan',
                        borderColor: 'lightcyan',
                    },
                }}

                onClick={() => { setMostrarMensajesEntrantes(!mostrarMensajesEntrantes) }}
            >
                {btnMensajes}
            </Button>

            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    {etiqueta}
                </Typography>
                {usuario.rol_id === 2 && !mostrarMensajesEntrantes && (
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
                            <TableCell><b>Ingreso</b></TableCell>                            
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
                                {mensaje.vehiculo === null && mostrarIngreso ?  (
                                    <TableCell>
                                        <RadioGroup
                                            name='ingreso'
                                            value={ingresos[index] || 'NO'}
                                            //value={selectedValue}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                            //onChange={handleRadioChange}
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
                                                    onChange={(e) => setData('vehiculo', e.target.value)}
                                                />

                                                <input hidden name='id' value={mensaje.id} />
                                                <Typography variant="h12" component="div" style={{ padding: '8px' }}>
                                                    Sin placa?, aceptar para ingreso a pie
                                                </Typography>
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
                                                    onClick={() => { handleGuardarVehiculo(mensaje.id) }}
                                                >
                                                    Aceptar
                                                </Button>
                                            </>
                                        ) }
                                    </TableCell>
                                ) : <TableCell>{mensaje.vehiculo}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
