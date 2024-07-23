import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

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

    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(()=>{
        setNombreUsuario(auth.auth.user.name);
    },[]);

    const submit = (e) => {
        e.preventDefault();
        post(route('novedad.store'));
        alert("Novedad registrada por " + nombreUsuario );
        reset('novedad');
    };

    return(
        <form onSubmit={submit}>            
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


