/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')

// update.addEventListener('click', function () {
//   fetch('frameworks', {
//     method: 'put',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'name': 'Darth Vader',
//       'framework': 'I find your lack of faith disturbing.'
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
// })

del.addEventListener('click', function () {
  fetch('frameworks', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  }).then(function (response) {
    window.location.reload()
  })
})