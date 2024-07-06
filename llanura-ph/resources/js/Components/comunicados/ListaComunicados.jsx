import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
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

    if(props.name){
      fetchComunicaciones();
    }    
  },[props.name]);

    // const data = [
    //     { name: 'John Doe', age: 28, job: 'Software Engineer' },
    //     { name: 'Jane Smith', age: 34, job: 'Product Manager' },
    //     { name: 'Sam Johnson', age: 22, job: 'Designer' },
    //   ];
    
      return (
        <div>
          <h1>Comunicados</h1>
          <ul>
            {comunicaciones.map((mensaje, index)=>(
              <li key = {mensaje.index}>
                <h2>{mensaje.asunto}</h2>
                <p>{mensaje.comunicado}</p>
                <p><strong>Fecha: </strong> {mensaje.fecha}</p>
              </li>
            ))}
          </ul>
        </div>
        // <TableContainer component={Paper}>
        //   <Table>
        //     <TableHead>
        //       <TableRow>
        //         <TableCell>Fecha</TableCell>
        //         <TableCell>Asunto</TableCell>
        //         <TableCell>Comunicado</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {data.map((row, index) => (
        //         <TableRow key={index}>
        //           <TableCell>{row.name}</TableCell>
        //           <TableCell>{row.age}</TableCell>
        //           <TableCell>{row.job}</TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>
    );
}


