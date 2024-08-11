import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { TextField } from '@mui/material';
import Destinatarios from './Destinatario';

export default function FormularioComunicados(props) {

    const { auth, usuarios } = props;

    const [token, setToken] = useState('');
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [selectedValue, setSelectedValue] = useState(null);

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
        asunto: '',
        comunicado: ''
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

    const [listaUsuarios, setListaUsuarios] = useState([]);


    const listaAdmins = usuarios.filter(item => item.rol_id === 1);
    const listaPorteros = usuarios.filter(item => item.rol_id === 2);
    const listaResidentes = usuarios.filter(item => item.rol_id === 3);

    useEffect(() => {
        if (auth.user.rol_id === 1) {
            console.log("está logueado un administrador");
            setListaUsuarios(listaResidentes);
        } else {
            console.log("No está logueado un administrador");
            setListaUsuarios(listaAdmins);
        }

    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('comunicaciones.store'));
        alert("Mensaje enviado a " + data.destinatarios.join(", ") + " desde " + data.origen);
        reset('origen', 'destinatarios', 'asunto', 'comunicado');
    };

    return (
        <form onSubmit={submit}>
            <input name='origen' type='hidden' value={data.origen} />

            {/* <div>
                <h1>Firebase Cloud Messaging con React</h1>
                {notification.title && (
                    <div>
                        <h2>{notification.title}</h2>
                        <p>{notification.body}</p>
                    </div>
                )}
            </div> */}

            <Destinatarios
                {...form}
            />

            <div className="mt-4">
                <InputLabel htmlFor="asunto" value="Asunto" />
                <TextField
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
                <TextField
                    id="comunicado"
                    name="comunicado"
                    value={data.comunicado}
                    className="mt-1 block w-full"
                    autoComplete="comunicado"
                    onChange={(e) => setData('comunicado', e.target.value)}
                    required
                    multiline
                    rows={4}
                />
                <InputError message={errors.comunicado} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ms-4" disabled={processing}>
                    Enviar
                </PrimaryButton>
            </div>
        </form>
    );
}
