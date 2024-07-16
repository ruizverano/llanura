import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
<<<<<<< HEAD
	 server: {
	    host: '0.0.0.0',
	    port: 5173
	  },
=======
    server: {
        proxy: {
            '/': {
                target: 'http://4.228.227.54:8000', // Ajusta según tu configuración de APP_URL en Laravel
                changeOrigin: true,
                secure: false,
            },
        },
    },
>>>>>>> fda75725e36ae30110e7cb7078c58d24bb3c6e54
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
