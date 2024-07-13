import React from 'react';
import BotonEnlace from '../BotonEnlace';

const AdminDashboard = (props) => {    
    
    return (
        <div>
            <h1>¿Bienvenido señor administrador, que desea hacer?</h1>

            <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get" 
                    //href={route('register')} 
                    href={route('usuarios.index')} 
                    as="button"
                    texto ={"Gestión de Usuarios"}
                />
            </div>

            <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get"
                    href={route('correspondencia.gestion')}
                    as="button"
                    texto ={"Gestión de Correspondencia"}
                />
            </div>        
        </div>
    );
}

export default AdminDashboard;
