import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { MenuItem, Select } from '@mui/material';
import Destinatarios from '../comunicados/Destinatario';

export default function FormularioNovedad(props) {

    const { auth, usuarios } = props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        origen: auth.user.name,
        destinatarios: [],
        novedad: ''
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

    const submit = (e) => {
        e.preventDefault();
        post(route('novedad.store'));
        alert("Novedad registrada por " + auth.user.name);
        reset('origen', 'novedad');
    };

    return (
        <form onSubmit={submit}>

            <input name='origen' type='hidden' value={data.origen} />

            <Destinatarios
                {...form}
            />
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


