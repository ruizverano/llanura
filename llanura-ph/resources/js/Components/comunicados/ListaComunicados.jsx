import React, { useState, useEffect } from 'react';


import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    InputLabel,
  } from '@mui/material';

export default function ListaComunicados(props){

  const [comunicaciones, setComunicaciones]= useState([]);
  
  useEffect(() => {
    const fetchComunicaciones = async () => {
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        
        const response = await fetch (`/get-comunicaciones`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({usuario: props.name}),
        });
        if(!response.ok){
          throw new Error('Hubo un error');
        }
        const data = await response.json();
        setComunicaciones(data);
      } catch (error) {
        console.error('Error fetching comunicaciones: ', error);
      }
    };    
      fetchComunicaciones();
        
  },[]);

    
      return (

        <TableContainer component={Paper}>
          <InputLabel>Mensajes recibidos:</InputLabel>
          <Table>            
            <TableHead>
              <TableRow>
                <TableCell>Nro.</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Asunto</TableCell>
                <TableCell>Comunicado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comunicaciones.map((mensaje, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{mensaje.fecha}</TableCell>
                  <TableCell>{mensaje.asunto}</TableCell>
                  <TableCell>{mensaje.comunicado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}


