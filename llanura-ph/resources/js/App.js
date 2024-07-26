// App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import SuperAdminDashboard from './SuperAdminDashboard';
import ResidenteDashboard from './ResidenteDashboard';
import PorteroDashboard from './PorteroDashboard';

import { messaging } from './firebase';

import Pusher from 'pusher-js/types/src/core/pusher';
import pusherJs from 'pusher-js';

function App() {

    /*
    useEffect(() => {
        messaging.requestPermission()
          .then(() => {
            return messaging.getToken();
          })
          .then(token => {
            console.log('Token de notificación:', token);
            // Aquí puedes enviar el token al servidor para almacenarlo
          })
          .catch(err => {
            console.log('Error al obtener el token', err);
          });
    
        messaging.onMessage(payload => {
          console.log('Mensaje recibido. ', payload);
          // Muestra la notificación en la UI
        });
      }, []);
      */

      useEffect(() => {
        // Habilitar el registro de Pusher en la consola - no lo incluyas en producción
        Pusher.logToConsole = true;
    
        // Configurar Pusher con tus credenciales
        const pusher = new Pusher('your-app-key', {
          cluster: 'your-app-cluster'
        });
    
        // Suscribirse al canal y evento específico
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
          alert(JSON.stringify(data));
        });
    
      }, []);

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <ProtectedRoute path="/admin" component={SuperAdminDashboard} role={1} />
                    <ProtectedRoute path="/residente" component={ResidenteDashboard} role={2} />
                    <ProtectedRoute path="/portero" component={PorteroDashboard} role={3} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
