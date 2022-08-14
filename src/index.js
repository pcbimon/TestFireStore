
import * as Swal from 'sweetalert2'
import { query, collection, getDocs, where } from 'firebase/firestore'
import db from './firebaseconfig'
import provider from './auth_google'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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
        alert('Success')
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
// btn Google Auth
const btnGoogleAuth = document.getElementById('btnGGLogin')
btnGoogleAuth.addEventListener('click', GGAuth)
function GGAuth () {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log(token)
      console.log(user)
      Swal.fire({
        title: 'Gethering Data.....',
        didOpen: () => {
          Swal.showLoading()
        }
      })
      try {
        const q = query(
          collection(db, 'user'),
          where('email', '==', user.email)
        )
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          Swal.close()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Found User'
          }).then((result) => {
            alert('Success')
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
    // ...
    }).catch((error) => {
    // Handle Errors here.
      console.log(error)
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error'
      })
    })
}
