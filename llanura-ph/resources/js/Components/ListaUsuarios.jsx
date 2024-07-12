import React from 'react';
import {
    Select,
    MenuItem
} from '@mui/material';

export default function ListaUsuarios ({usuarios}){
    return (
        <Select>
            {
                usuarios.map((usuario, index) => (
                    <MenuItem>{usuario}</MenuItem>
                ))
            }
        </Select>
    );
}