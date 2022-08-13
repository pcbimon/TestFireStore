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
console.log(db)

// Init User to fire store
// const docRef = await addDoc(collection(db, "user"), {
//     first: "Patipat",
//     last: "Chewprecha",
//     email: "pcbimon@gmail.com",
//     password: "Test@001",
//     createdAt: Timestamp.now(),
//   });
//   console.log("Document written with ID: ", docRef.id);

// async function login() {
//     const username = document.getElementById('username');
//     const password = document.getElementById('password');
//     try {
//         const q = query(
//             collection(db, "user"),
//             where("email", "==", username),where("password","==",password)
//         );
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//             console.log('found');
//         } else {
//             console.log('not found');
//         }

//     } catch (e) {
//         console.error("Error document: ", e);
//     }
// }
