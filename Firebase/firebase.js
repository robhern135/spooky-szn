import * as firebase from "firebase"
import "firebase/firestore"
import { getFirestore, setDoc, doc } from "firebase/firestore"

import {
  ENV_apiKey,
  ENV_projectId,
  ENV_storageBuckets,
  ENV_messagingSenderId,
  ENV_measurementId,
} from "@env"

const firebaseConfig = {
  apiKey: ENV_apiKey,
  projectId: ENV_projectId,
  storageBuckets: ENV_storageBuckets,
  messagingSenderId: ENV_messagingSenderId,
  measurementId: ENV_measurementId,
}

// Initialize Firebase
let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()

const db = firebase.firestore()

export { auth, db }
