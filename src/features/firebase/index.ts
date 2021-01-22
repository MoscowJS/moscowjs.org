import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyAsVQ1nAZNCdXs_9CmpJgNZb6yscpZ4dIY",
  authDomain: "moscowjs-fad97.firebaseapp.com",
  databaseURL:
    "https://moscowjs-fad97-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moscowjs-fad97",
  storageBucket: "moscowjs-fad97.appspot.com",
  messagingSenderId: "152903911908",
  appId: "1:152903911908:web:60b0d402217339842d9ff1",
}

let app: firebase.app.App

export const auth = () => {
  if (app) return app.auth()

  return (app = firebase.initializeApp(firebaseConfig)).auth()
}

export const database = () => {
  if (app) return app.database()

  return (app = firebase.initializeApp(firebaseConfig)).database()
}
