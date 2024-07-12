import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function FormularioRegistro(auth){

    const { 
        data, 
        setData, 
        post, 
        processing, 
        errors, 
        reset,         
    } = useForm({                
        registro: '',        
    });  

    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(()=>{
        setNombreUsuario(auth.auth.user.name);        
    },[]);

    const submit = (e) => {
        e.preventDefault();
        post(route('registro.store'));
        alert("Reporte registrado por " + nombreUsuario );
        reset('registro');
    };

    return(
        <form onSubmit={submit}>            
            <div>
                <InputLabel htmlFor="registro" value="Reporte" />
                <textarea
                    id="registro"
                    name="registro"
                    value={data.registro}
                    className="mt-1 block w-full"
                    autoComplete="registro"
                    isFocused={true}
                    onChange={(e) => setData('registro', e.target.value)}
                    required
                    rows="4"
                />
                <InputError message={errors.registro} className="mt-2" />
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


