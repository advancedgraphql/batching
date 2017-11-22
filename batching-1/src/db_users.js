const users = [
  {
    id: 'abc',
    name: 'Sarah'
  }, {
    id: 'def',
    name: 'John'
  }, {
    id: 'ghi',
    name: 'Mary'
  }, {
    id: 'jkl',
    name: 'Carl'
  }
]

function openDB(cb) {
  console.log(`open DB`)  
  setTimeout(cb, 1000)
}

function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    openDB(() => {
      const user = users.find(user => user.id === id)
      resolve(user)
    })
  })
}

function batchedUserFetching(ids) {
  return new Promise((resolve, reject) => {
    openDB(() => {
      const foundUsers = []
      for (const id of ids) {
        const user = users.find(user => user.id === id)
        foundUsers.push(user)
      }
      resolve(foundUsers)
    })
  })
}

module.exports = {
  fetchUserById,
  batchedUserFetching
}