import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BEmAkbMEw1nEuN5UQLzQmuKtHat3jLvqfi-ZSo2nthD-iR_EE4vjtqDtWnyehcTgBO75Dost1aRxbskVXwqCj_Y" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Token fetched successfully:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
};

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        console.log('Token recibido:', currentToken);
        return currentToken;
      } else {
        console.log('No se obtuvo token de registro.');
      }
    } else {
      console.log('Permiso de notificación no concedido.');
    }
  } catch (err) {
    console.error('Error al obtener el token:', err);
  }
  return null;
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    }, (error) => {
      reject(error);
    });
  });
