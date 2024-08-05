import React, { useState } from 'react';
import { Button } from '@mui/material';

export default function ReporteCorrespondencia(props) {
    const { usuario, paquetes, gestion } = props;
    const [mostrarDate, setMostrarDate] = useState(false);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleGenerarReporte = () => {
        const paquetesFiltrados = paquetes.filter(paquete => {
            const fechaPaquete = new Date(paquete.fecha);
            const fechaInicio = new Date(fechaDesde);
            const fechaFin = new Date(fechaHasta);

            return fechaPaquete >= fechaInicio && fechaPaquete <= fechaFin;
        });

        const tablaHTML = `
            <table border="1" style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Entregado</th>
                        <th>Origen</th>
                        <th>Destino</th>
                    </tr>
                </thead>
                <tbody>
                    ${paquetesFiltrados.map((paquete, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${paquete.fecha}</td>
                            <td>${paquete.descripcion}</td>
                            <td>${paquete.entregado === 1 ? 'SI' : 'NO'}</td>
                            <td>${paquete.origen}</td>
                            <td>${paquete.destino}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        const ventana = window.open('', '_blank');
        ventana.document.write('<html><head><title>Reporte de Correspondencia LLANURA-PH</title></head><body>');
        ventana.document.write('<h1>Reporte de Correspondencia</h1>');
        ventana.document.write(tablaHTML);
        ventana.document.write('</body></html>');
        ventana.document.close();
        ventana.print();
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
                onClick={() => { setMostrarDate(!mostrarDate) }}
            >
                Reportes
            </Button>
            {mostrarDate && (
                <>
                    <div>
                        desde:
                        <input type='date' value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
                        |
                        hasta:
                        <input type='date' value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
                    </div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#007BFF', 
                            color: '#ffffff', 
                            '&:hover': {
                                backgroundColor: '#0056b3', 
                            },
                            padding: '5px 10px', 
                            borderRadius: '4px', 
                        }}
                        onClick={handleGenerarReporte}
                    >
                        Aceptar
                    </Button>
                </>
            )}
        </>
    );
}
