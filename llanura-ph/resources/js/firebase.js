import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

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

export { messaging };
