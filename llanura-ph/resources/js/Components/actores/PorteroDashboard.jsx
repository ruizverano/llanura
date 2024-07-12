import React from 'react';
import BotonEnlace from '../BotonEnlace';

const PorteroDashboard = (props) => {
    return (
        <div>
             <h1>¿Bienvenido señor portero, que desea hacer?</h1>

             <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get" 
                    href={route('registro.create')} 
                    as="button"
                    texto ={"Registrar reportes"}
                />
            </div>

        </div>
    );
}
export default PorteroDashboard;
