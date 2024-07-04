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

    const data = [
        { name: 'John Doe', age: 28, job: 'Software Engineer' },
        { name: 'Jane Smith', age: 34, job: 'Product Manager' },
        { name: 'Sam Johnson', age: 22, job: 'Designer' },
      ];
    
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Asunto</TableCell>
                <TableCell>Comunicado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.job}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}


