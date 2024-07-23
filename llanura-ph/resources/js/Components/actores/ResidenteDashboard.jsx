import React from 'react';
import BotonEnlace from '../BotonEnlace';

const ResidenteDashboard = (props) => {
    return (
        <div>
             <h1>¿Bienvenido señor residente, que desea hacer?</h1>

            <div className="flex items-center justify-center mt-4">
                <BotonEnlace 
                    tipo={"boton-enlace"} 
                    method="get" 
                    href={route('novedad.create')} 
                    as="button"
                    texto ={"Registrar novedades"}
                />
            </div>                     
        </div>
    );
}

export default ResidenteDashboard;
