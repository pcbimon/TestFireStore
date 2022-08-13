
import * as Swal from 'sweetalert2'
import { query, collection, getDocs, where } from 'firebase/firestore'
import db from './firebaseconfig'
console.log(db)

// login form
const loginFrm = document.getElementById('loginFrm')
// loginFrm.onsubmit = async function (ev) { await login(ev) }
loginFrm.addEventListener('submit', async (event) => {
  event.preventDefault()
  await login()
})

async function login () {
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  Swal.fire({
    title: 'Gethering Data.....',
    didOpen: () => {
      Swal.showLoading()
    }
  })
  try {
    const q = query(
      collection(db, 'user'),
      where('email', '==', username.value), where('password', '==', password.value)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Found User'
      }).then((result) => {
        window.location = './user.html'
      })
    } else {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Not Found User'
      }).then((result) => {
        window.location = './register.html'
      })
    }
  } catch (e) {
    console.error('Error document: ', e)
    Swal.close()
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error'
    })
  }
}
