import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Grid
} from '@mui/material';
import BotonEnlace from '../BotonEnlace';
import ReporteCorrespondencia from './ReporteCorrespondencia';

export default function PaquetesRecibidos(props) {

    const { usuario, paquetes, gestion } = props;

    useEffect(()=>{
        //console.log(usuario);
    },[]);

    return (
        <div>            
            <TableContainer component={Paper}>
                <Typography variant="h6" component="div" style={{ padding: '16px' }}>
                    {gestion ? `Paquetes recibidos, puede gestionar la entrega con el respectivo Botón` : `Paquetes recibidos por ${usuario.name}`}
                </Typography>
                {usuario.rol_id===1 && (
                      <ReporteCorrespondencia {...props}/>
                )}                  
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nro.</b></TableCell>
                            <TableCell><b>Fecha (AAAA-MM-dd)</b></TableCell>                           
                            <TableCell><b>Descripción</b></TableCell>
                            {usuario.rol_id===2 && (
                                <>
                                    <TableCell><b>¿Entregado?</b></TableCell>
                                    <TableCell><b>Origen</b></TableCell>
                                    <TableCell><b>Destino</b></TableCell>
                                </>
                            )}                            
                            
                            {gestion && (
                                <TableCell><b>Gestionar</b></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paquetes.filter(paquete => gestion || paquete.destino === usuario.name).map((paquete, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{paquete.fecha}</TableCell>                                
                                <TableCell>{paquete.descripcion}</TableCell>                                
                                {usuario.rol_id===2 && (
                                    <>
                                        <TableCell>{paquete.entregado === 1 ? 'SI' : 'NO'}</TableCell>                    
                                        <TableCell>{paquete.origen}</TableCell>
                                        <TableCell>{paquete.destino}</TableCell>
                                    </>
                                    )}                                                                
                                {gestion && usuario.rol_id===2 && (
                                    <TableCell>
                                        {paquete.entregado === 0 && (
                                            <BotonEnlace 
                                                tipo={"boton-enlace"} 
                                                method="post"
                                                href={route('entregar',[paquete])} 
                                                as="button"
                                                texto ={"Entregar"}
                                            />
                                        )}                                        
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}