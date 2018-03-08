import Rebase from 're-base';
import firebase from 'firebase';


const app = firebase.initializeApp({
    apiKey: "AIzaSyDN7P8sJFfH9ca91NfUfqXMD0CXhIdUkXo",
    authDomain: "task-manager-f5b00.firebaseapp.com",
    databaseURL: "https://task-manager-f5b00.firebaseio.com",
    projectId: "task-manager-f5b00",
    storageBucket: "",
    messagingSenderId: "118393262621"
  });

  var base = Rebase.createClass(app.database())

  export {app, base}