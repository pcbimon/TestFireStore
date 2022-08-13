import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDItZiRnZ2apuIYbtoZRel_dpElgi6F4o0',
  authDomain: 'mon-abvltw.firebaseapp.com',
  databaseURL: 'https://mon-abvltw.firebaseio.com',
  projectId: 'mon-abvltw',
  storageBucket: 'mon-abvltw.appspot.com',
  messagingSenderId: '16352393465',
  appId: '1:16352393465:web:0cc9d5c6ae2438f69c4a28'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// Initialize Firestore
const db = getFirestore(firebaseApp)
export default db
