import db from './firebaseconfig'
import { query, collection, getDocs } from 'firebase/firestore'
import * as Swal from 'sweetalert2'
console.log(db)
let usersNo = 0
const tbody = document.getElementById('userlist')
Swal.fire({
  title: 'Gethering Data.....',
  didOpen: () => {
    Swal.showLoading()
  }
})
const q = query(
  collection(db, 'user')
)
const querySnapshot = await getDocs(q)
const dusers = []

querySnapshot.forEach(doc => {
  console.log(doc.id)
  const d = {
    id: doc.id,
    ...doc.data()
  }
  dusers.push(d)
})

addAllDataToTable(dusers)
function addAllDataToTable (Users) {
  usersNo = 0
  tbody.innerHTML = ''
  Users.forEach(element => {
    console.log(element)
    addDataToTable(element.first, element.last, element.email)
  })
}
function addDataToTable (uFname, uLname, uEamil) {
  // let body = document.getElementById('tbody1');
  const trow = document.createElement('tr')
  const td1 = document.createElement('td')
  const td2 = document.createElement('td')
  const td3 = document.createElement('td')
  const td4 = document.createElement('td')

  td1.innerHTML = ++usersNo
  td2.innerHTML = uFname
  td3.innerHTML = uLname
  td4.innerHTML = uEamil
  td1.classList += 'unoField'
  td2.classList += 'ufnameField'
  td3.classList += 'ulnameField'
  td4.classList += 'uageField'
  trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4)
  tbody.appendChild(trow)
  Swal.close()
  addRowHandlers()
}
function addRowHandlers () {
  const table = document.getElementById('tbUser')
  const rows = table.getElementsByTagName('tr')
  for (let i = 1; i < rows.length; i++) {
    const currentRow = table.rows[i]
    const createClickHandler =
            function (row) {
              return function () {
                const cell = row.getElementsByTagName('td')[0]
                const id = cell.innerHTML
                for (let j = 1; j < rows.length; j++) {
                  const cRow = table.rows[j]
                  cRow.classList.remove('selected-row')
                }
                row.classList.add('selected-row')
                // click row to show data
                // showDataOnRow(dusers[parseInt(id - 1)])
                // click row to redirect new page with param
                showUserSelected(dusers[parseInt(id - 1)].id)
              }
            }

    currentRow.onclick = createClickHandler(currentRow)
  }
}
function showDataOnRow (user) {
  const result = document.getElementById('selectedUser')
  result.textContent = JSON.stringify(user, undefined, 2)
}
function showUserSelected (id) {
  window.location = './viewusr.html?id=' + id
}
