import db from './firebaseconfig'
import { query, collection, getDoc, doc } from 'firebase/firestore'
import * as Swal from 'sweetalert2'
console.log(db)
function getParameterByName (name, url = window.location.href) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
await getuserdetail()
async function getuserdetail () {
  const userId = getParameterByName('id')
  console.log(userId)
  Swal.fire({
    title: 'Gethering Data.....',
    didOpen: () => {
      Swal.showLoading()
    }
  })
  const q = doc(db, 'user', userId)

  const querySnapshot = await getDoc(q)
  let d = {}
  if (querySnapshot.exists()) {
    d = {
      id: querySnapshot.id,
      ...querySnapshot.data()
    }
    console.log('Document data:', querySnapshot.data())
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
  const result = document.getElementById('selectedUser')
  result.textContent = JSON.stringify(d, undefined, 2)
  Swal.close()
}
