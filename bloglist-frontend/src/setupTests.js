import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

const user = {
  username: 'ptiainen',
  token: '1231231214',
  name: 'P Tiainen'
}
localStorageMock.setItem('loggedBlogsappUser', JSON.stringify(user))
Object.defineProperty(window, 'localStorage', { value: localStorageMock })


/* const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
}) */