importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
export const environment = {
    production: false,
    firebaseConfig : {
      apiKey: "AIzaSyDPyTDpyi-97xdiyvi6xLptfA7RRd3p4bo",
      authDomain: "jaliyankw.firebaseapp.com",
      databaseURL: "https://jaliyankw.firebaseio.com",
      projectId: "jaliyankw",
      storageBucket: "jaliyankw.appspot.com",
      messagingSenderId: "3641686176",
      appId: "1:3641686176:web:da07f0ec0bc4642e3c31c5",
      measurementId: "G-XL2VQTD8SV"
    }
  };
const messaging = firebase.messaging();
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }