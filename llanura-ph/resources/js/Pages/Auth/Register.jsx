import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const opcionesRoles = [
        {value: 0, label: ''},
        {value: 1, label: 'Administrador'},
        {value: 2, label: 'Portero'},
        {value: 3, label: 'Residente'},
    ];

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombres" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="usuario" value="Usuario" />

                    <TextInput
                        id="usuario"
                        name="usuario"
                        value={data.usuario}
                        className="mt-1 block w-full"
                        autoComplete="usuario"
                        isFocused={true}
                        onChange={(e) => setData('usuario', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirme Contraseña" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="telefono" value="Teléfono" />

                    <TextInput
                        id="telefono"
                        name="telefono"
                        value={data.telefono}
                        className="mt-1 block w-full"
                        autoComplete="telefono"
                        onChange={(e) => setData('telefono', e.target.value)}   
                        required                     
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>                

                <div className="mt-4">
                    <InputLabel htmlFor="torre" value="Torre" />

                    <TextInput
                        id="torre"
                        name="torre"
                        type="number"
                        value={data.torre}
                        className="mt-1 block w-full"
                        autoComplete="torre"
                        onChange={(e) => setData('torre', e.target.value)}    
                        required                    
                    />

                    <InputError message={errors.torre} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="apto" value="Apartamento" />

                    <TextInput
                        id="apto"
                        name="apto"
                        type="number"
                        value={data.apto}
                        className="mt-1 block w-full"
                        autoComplete="apto"
                        onChange={(e) => setData('apto', e.target.value)}    
                        required                    
                    />

                    <InputError message={errors.apto} className="mt-2" />
                </div>

                <div className="mt-4">                    
                    <InputLabel htmlFor="rol_id" value="Rol" />

                    <Select
                        id="rol_id"
                        name="rol_id"
                        value={data.rol_id}
                        className="mt-1 block w-full"
                        autoComplete="rol_id"
                        onChange={(e) => {setData('rol_id', e.target.value); console.log("valor: "+e.target.value)}}
                        options={opcionesRoles} 
                        required   
                    />

                    <InputError message={errors.rol} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ya está registrado?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
