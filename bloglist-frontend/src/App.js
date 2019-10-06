import React, { useState, useEffect } from 'react'
//import logo from './logo.svg';
//import './App.css';
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import Errorinfo from './components/Errorinfo'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { bind:usernameinput, reset:resetusername } = useField('text')
  const { bind:passwordinput, reset:resetpassword } = useField('password')
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogsappUser')
    blogService.setToken('')
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const dic = {
        name:usernameinput.value, password:passwordinput.value,
      }
      console.log(dic['name'])
      const user = await loginService.login({
        username:usernameinput.value, password:passwordinput.value,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      resetpassword()
      resetusername()
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      showErrorMessage('wrong credentials')
    }
  }

  const onUpdateblogs = (data) => {
    showMessage('Uusi blogi. ' + data['title'] + '  by ' + data['author'] )
    setBlogs(blogs.concat(data))
  }

  const onUpdateOneblog = (data) => {
    var temppi = blogs.filter(function(value, index, arr){
      return  value.id !== data.id
    }).concat(data).sort((a,b) => b.likes - a.likes)
    setBlogs(temppi)
  }
  const onRemove = (data) => {
    setBlogs(blogs.filter(function(value, index, arr){
      return  value.id !== data.id
    }))
  }
  const showMessage = (message) => {
    setInfoMessage(
      message
    )
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(
      message
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type={usernameinput.type}
          value={usernameinput.value}
          name="Username"
          onChange={usernameinput.onChange}
        />
      </div>
      <div>
        password
        <input
          type={passwordinput.type}
          value={passwordinput.value}
          name="Password"
          onChange={passwordinput.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Errorinfo message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={infoMessage} />
        <Errorinfo message={errorMessage} />
        <p>{user.username} logged in </p>
        <button onClick={handleLogout}>Kirjaudu ulos</button>
        <br/>
        <BlogForm onUpdate={onUpdateblogs}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onUpdate={onUpdateOneblog} user={user} onRemove={onRemove}/>
        )}
      </div>
    )}
}


export default App
