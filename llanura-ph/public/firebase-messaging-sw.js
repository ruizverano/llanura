importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAx6zfOIkT0_udEqz7Kyttjx-SqiurJL5o",
    authDomain: "llanura-37340.firebaseapp.com",
    projectId: "llanura-37340",
    storageBucket: "llanura-37340.appspot.com",
    messagingSenderId: "496175761072",
    appId: "1:496175761072:web:2590e0812d9a2b9e429d75",
    measurementId: "G-SPPDP961L6"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
