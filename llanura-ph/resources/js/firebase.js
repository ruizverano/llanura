import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAx6zfOIkT0_udEqz7Kyttjx-SqiurJL5o",
    authDomain: "llanura-37340.firebaseapp.com",
    projectId: "llanura-37340",
    storageBucket: "llanura-37340.appspot.com",
    messagingSenderId: "496175761072",
    appId: "1:496175761072:web:2590e0812d9a2b9e429d75",
    measurementId: "G-SPPDP961L6"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const vapidKey = "BEmAkbMEw1nEuN5UQLzQmuKtHat3jLvqfi-ZSo2nthD-iR_EE4vjtqDtWnyehcTgBO75Dost1aRxbskVXwqCj_Y";

getToken(messaging, { vapidKey }).then((currentToken)=> {
    if (currentToken){
        console.log('token recibido: ', currentToken); 
    } else {
        console.log("no se obtuvo token de registro. Solicita permisos para generar uno.");
    }
}).catch((err) => {
    console.log("Error al obtener token; ",err);
});

// function requestNotificationPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Permiso de notificación concedido.');
//         // Aquí puedes recuperar el token de registro si aún no lo has hecho
//       } else {
//         console.log('Permiso de notificación no concedido.');
//       }
//     });
//   }

  export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Permiso de notificación concedido.');
            const currentToken = await getToken(messaging, { vapidKey });
            if (currentToken) {
                console.log('Token recibido:', currentToken);
                // Envía el token a tu servidor para almacenarlo y usarlo para enviar notificaciones
            } else {
                console.log('No se obtuvo token de registro.');
            }
        } else {
            console.log('Permiso de notificación no concedido.');
        }
    } catch (err) {
        console.error('Error al obtener el token:', err);
    }
};
  
//export {requestNotificationPermission};

export { messaging };
