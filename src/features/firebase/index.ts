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

class FBApp {
  private static instance: FBApp
  public app: firebase.app.App
  public auth: firebase.auth.Auth
  public database: firebase.database.Database

  private constructor() {
    this.app = firebase.initializeApp(firebaseConfig)
    this.auth = this.app.auth()
    this.database = this.app.database()
  }

  public static getInstance(): FBApp {
    if (!FBApp.instance) {
      FBApp.instance = new FBApp()
    }

    return FBApp.instance
  }
}

export const getApp = () => {
  return FBApp.getInstance()
}

export const auth = () => {
  return FBApp.getInstance().auth
}

export const database = () => {
  return FBApp.getInstance().database
}
