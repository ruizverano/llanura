import React from 'react';
import '../../css/app.css';
import { Link } from '@inertiajs/react';

const BotonEnlace = ({ href, texto, tipo, ...props }) => {
  return (
    <Link
        {...props}
        href={href} 
        className={tipo}
    >
        {texto}
    </Link>
  );
};

export default BotonEnlace;
