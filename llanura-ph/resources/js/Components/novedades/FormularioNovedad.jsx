import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { MenuItem, Select } from '@mui/material';

export default function FormularioNovedad(auth){

    const { 
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        novedad: '',
    });

    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [nombreUsuario, setNombreUsuario] = useState('');

    const obtenerUsuariosAdministradores = () => {
        axios.get('/get-administradores')
            .then(response => {
                setListaUsuarios(response.data);
                console.log(response.data[0].usuario);
            })
            .catch(error => {
                console.log('Hubo un error guardando el vehículo', error);
            });
    };

    useEffect(()=>{
        setNombreUsuario(auth.auth.user.name);
        obtenerUsuariosAdministradores();
    },[]);    

    const submit = (e) => {
        e.preventDefault();        
        post((route('novedad.store')) , {            
            onSuccess: () => {
                alert("Novedad registrada por " + nombreUsuario );
                reset('novedad');
            }            
        });
    };

    return(
        <form onSubmit={submit}>
            <div className="mt-4">                    
                <InputLabel htmlFor="destinatario" value="Administrador" />

                <Select
                    id="destinatario"
                    name="destinatario"
                    value={data.destinatario}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('destinatario', e.target.value)}
                    required
                >
                    {
                        listaUsuarios.map((usuario, index)=>(
                            <MenuItem key={index} value={usuario.usuario}>{usuario.usuario}</MenuItem>
                        ))
                    }
                </Select>

                <InputError message={errors.destinatario} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="novedad" value="Novedad" />
                <textarea
                    id="novedad"
                    name="novedad"
                    value={data.novedad}
                    className="mt-1 block w-full"
                    autoComplete="novedad"
                    isFocused={true}
                    onChange={(e) => setData('novedad', e.target.value)}
                    required
                    rows="4"
                />
                <InputError message={errors.novedad} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ms-4" 
                    disabled={processing}>
                    Enviar
                </PrimaryButton>
            </div>
        </form>
    );
}


