import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import BotonEnlace from '../BotonEnlace';

const AdminDashboard = (props) => {
    
    
    return (
        <div>
            <h1>¿Que desea hacer?</h1>

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
                    //method="post" 
                    //href={route('#')} 
                    as="button"
                    texto ={"Gestión de Correspondencia"}
                />
            </div>            
        </div>
    );
}

export default AdminDashboard;
