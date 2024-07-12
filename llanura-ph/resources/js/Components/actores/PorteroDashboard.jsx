// resources/js/SuperAdminDashboard.jsx
import React from 'react';

const PorteroDashboard = (props) => {
    return (
        <div>
             <h1>¿Bienvenido señor portero, que desea hacer?</h1>

            <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get" 
                    href={route('register')} 
                    as="button"
                    texto ={"Gestión de Usuarios"}
                />
            </div>

            <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get"
                    //href={route('#')} 
                    as="button"
                    texto ={"Gestión de Correspondencia"}
                />
            </div>            
        </div>
    );
}
export default PorteroDashboard;
