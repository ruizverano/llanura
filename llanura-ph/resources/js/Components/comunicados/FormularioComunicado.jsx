import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {
    Select,
    MenuItem
} from '@mui/material';

export default function FormularioComunicados(props){

    const { 
        data, 
        setData, 
        post, 
        processing,
        errors,
        reset,
    } = useForm({
        origen:props.auth.user.name,
        destinatario: '',
        asunto: '',
        comunicado: ''
    });

    const [listaUsuarios, setListaUsuarios] = useState([]);

    useEffect(() => {
        setListaUsuarios(props.usuarios);
        return () => {
            reset('origen','destinatario', 'asunto', 'comunicado');
        };
    }, []);
    

    const submit = (e) => {
        e.preventDefault();
        post(route('comunicaciones.store'));
        alert("Mensaje enviado a "+data.destinatario + " desde "+data.origen);
        reset('origen','destinatario', 'asunto', 'comunicado');
    };

    return(
        <form onSubmit={submit}>
            <input name='origen' type='hidden' value={data.origen}/>            

            <div className="mt-4">                    
                <InputLabel htmlFor="destinatario" value="Destinatario" />

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
                            <MenuItem key={index} value={usuario}>{usuario}</MenuItem>
                        ))
                    }
                </Select>

                <InputError message={errors.destinatario} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="asunto" value="Asunto" />
                <TextInput
                    id="asunto"
                    name="asunto"
                    value={data.asunto}
                    className="mt-1 block w-full"
                    autoComplete="asunto"
                    onChange={(e) => setData('asunto', e.target.value)}
                    required
                />
                <InputError message={errors.asunto} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="comunicado" value="Mensaje" />
                <textarea
                    id="comunicado"
                    name="comunicado"
                    value={data.comunicado}
                    className="mt-1 block w-full"
                    autoComplete="comunicado"
                    onChange={(e) => setData('comunicado', e.target.value)}
                    required
                    rows="4"
                />
                <InputError message={errors.comunicado} className="mt-2" />
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
