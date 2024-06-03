import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    /* server: {
        host: '0.0.0.0',  // Escuchar en todas las interfaces
        watch: {
            usePolling: true,  // Opcional: Puede ser necesario en algunos sistemas de archivos montados
        },
    }, */
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});
