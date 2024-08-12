import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Select,
    MenuItem
} from '@mui/material';
import Destinatarios from '../comunicados/Destinatario';

export default function FormularioCorrespondencia(props) {

    const { auth, usuarios } = props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        portero: auth.user.name,
        descripcion: '',
        origen: '',
        destino: '',
        entregado: '',
    });

    const form = {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        auth,
        usuarios
    };

    useEffect(() => {        
        return () => {
            reset('portero', 'descripcion', 'origen', 'destino', 'entregado');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('correspondencia.store'));
        alert("Correspondencia registrada por " + data.portero);
        reset('portero', 'descripcion', 'origen', 'destino', 'entregado');
    };

    return (
        <form onSubmit={submit}>
            <input name='portero' type='hidden' value={data.portero} />
            <div>
                <InputLabel htmlFor="descripcion" value="Descripcion" />
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={data.descripcion}
                    className="mt-1 block w-full"
                    autoComplete="descripcion"
                    isFocused={true}
                    onChange={(e) => setData('descripcion', e.target.value)}
                    required
                    rows="4"
                />
                <InputError message={errors.descripcion} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="origen" value="Origen" />
                <TextInput
                    id="origen"
                    name="origen"
                    value={data.origen}
                    className="mt-1 block w-full"
                    autoComplete="origen"
                    onChange={(e) => setData('origen', e.target.value)}
                    required
                />
                <InputError message={errors.origen} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="destino" value="Destino" />

                <Destinatarios
                    {...form}
                />

                <InputError message={errors.destino} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="entregado" value="Entregado" />

                <Select
                    id="entregado"
                    name="entregado"
                    value={data.entregado}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('entregado', e.target.value)}
                    required
                >
                    <MenuItem value={1}>SI</MenuItem>
                    <MenuItem value={0}>NO</MenuItem>
                </Select>

                <InputError message={errors.entregado} className="mt-2" />
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


