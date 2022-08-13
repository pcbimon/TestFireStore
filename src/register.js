import db from './firebaseconfig'
import * as Swal from 'sweetalert2'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
console.log(db)
console.log('register page')

// form
const registerFrm = document.getElementById('registerFrm')
registerFrm.addEventListener('submit', async (event) => {
  event.preventDefault()
  await register()
})

async function register () {
  Swal.fire({
    title: 'Processing Data.....',
    didOpen: () => {
      Swal.showLoading()
    }
  })
  const firstname = document.getElementById('firstname')
  const lastname = document.getElementById('lastname')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  try {
    const docRef = await addDoc(collection(db, 'user'), {
      first: firstname.value,
      last: lastname.value,
      email: email.value,
      password: password.value,
      createdAt: Timestamp.now()
    })
    console.log('Document written with ID: ', docRef.id)
    Swal.close()
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Store User To Firebase Complete ID ' + docRef.id
    }).then(() => {
      window.location = './index.html'
    })
  } catch (error) {
    console.error(error)
    Swal.close()
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error',
      didOpen: () => {
      }
    })
  }
}
