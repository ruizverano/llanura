import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';

export default function Destinatarios(props) {

    const {
        setData,
        errors,
        data,
        auth,
        usuarios,
    } = props;

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [destinatariosFiltrados, setDestinatariosFiltrados] = useState([]);
    const listaResidentes = usuarios.filter(item => item.rol_id === 3);
    const listaTorres = [...new Set(listaResidentes.map(usuario => usuario.torre))];
    const [labelDestino, setLabelDestino] = useState('');

    const [envioPorTorres, setEnvioPorTorres] = useState(false);

    useEffect(() => {
        if (auth.user.rol_id === 1) {
            setListaUsuarios(listaResidentes);
            setLabelDestino('Residentes');
        } else if(auth.user.rol_id === 2){
            setListaUsuarios(usuarios.filter(item => item.rol_id === 1 || item.rol_id === 3));
            setLabelDestino('Admins y Residentes');
        }else{
            setListaUsuarios(usuarios.filter(item => item.rol_id === 1 || item.rol_id === 2));
            setLabelDestino('Admins y Porteros');
        }
    }, [auth.user.rol_id, usuarios]);

    useEffect(() => {
        const nuevosDestinatarios = listaUsuarios
            .filter(usuario => data.torres && data.torres.includes(usuario.torre))
            .map(usuario => usuario.usuario);

        setDestinatariosFiltrados(nuevosDestinatarios);
    }, [data.torres, listaUsuarios]);

    useEffect(() => {
        if (envioPorTorres) {
            setData('destinatarios', destinatariosFiltrados);
        }
    }, [destinatariosFiltrados, setData]);

    useEffect(() => {
        console.log('destinatarios');
        console.log(data.destinatarios);
    }, [data.destinatarios]);

    return (
        <Box
            sx={{
                borderRadius: '8px',
                border: '1px solid lightblue',
                padding: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            {auth.user.rol_id === 1 || auth.user.rol_id === 2 && (
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

                    onClick={() => { setEnvioPorTorres(!envioPorTorres) }}
                >
                    {envioPorTorres ? 'Residentes' : 'Torres'}
                </Button>
            )}


            {!envioPorTorres && (
                <div className="mt-4">
                    <InputLabel htmlFor="destinatarios" value="Usuarios" />

                    <Autocomplete
                        name="destinatarios"
                        multiple
                        disableClearable
                        disablePortal
                        fullWidth
                        options={listaUsuarios}
                        getOptionLabel={(option) => option.usuario}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValues) => {
                            setData('destinatarios', newValues.map(value => value.usuario));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={`(${labelDestino})`}
                                style={{ fontSize: '1.3rem' }}
                                fullWidth
                                variant="standard"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />

                    <InputError message={errors.destinatarios} className="mt-2" />
                </div>
            )}

            {auth.user.rol_id === 1 || auth.user.rol_id === 2 && envioPorTorres && (
                <div className="mt-4">
                    <InputLabel htmlFor="torres" value="Torres" />

                    <Autocomplete
                        name="torres"
                        multiple
                        disableClearable
                        disablePortal
                        fullWidth
                        options={listaTorres}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option === value}
                        onChange={(event, newValues) => {
                            setData('torres', newValues);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                style={{ fontSize: '1.3rem' }}
                                fullWidth
                                variant="standard"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />

                    <InputError message={errors.torres} className="mt-2" />
                </div>
            )}
        </Box>
    );
}
