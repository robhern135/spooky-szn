import * as firebase from "firebase"
import "firebase/firestore"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth/react-native"

const firebaseConfig = {
  apiKey: "AIzaSyD6Kmg8TxQ6y1zzZroe_bNpIrvG3gahg58",
  authDomain: "spooky-szn.firebaseapp.com",
  projectId: "spooky-szn",
  storageBucket: "spooky-szn.appspot.com",
  messagingSenderId: "361405991781",
  appId: "1:361405991781:web:b017f626499cc02776af8c",
  measurementId: "G-TVB8B1BQV5",
}

// Initialize Firebase
let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// })

const db = firebase.firestore()

export { auth, db }
