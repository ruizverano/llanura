import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        proxy: {
            '/': {
                target: 'http://4.228.227.54:8000', // Ajusta según tu configuración de APP_URL en Laravel
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});