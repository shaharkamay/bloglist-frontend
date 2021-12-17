import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notyf } from 'notyf'
import Togglable from './components/Togglabe'

const notyf = new Notyf({
  duration: 5000,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'error',
      background: 'indianred',
      dismissible: true,
    },
    {
      type: 'success',
      background: 'green',
      dismissible: 'true',
    },
  ],
})


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)




  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user))
      notyf.success('Logged in successfully')
    } catch (exception) {
      notyf.error('Wrong credentials')
    }
  }
  const handleLike = async (blogId, setLikes) => {
    const updatedBlog = await blogService.incrementLikes(blogId, user.token)
    setLikes(updatedBlog.likes)
    notyf.success('Liked successfully!')
  }
  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId, user.token)
      notyf.success('Deleted blog successfully')
      setBlogs(blogs => [...blogs.filter(blog => blog.id !== blogId)])
    } catch (error) {
      notyf.error(error.message)
    }
  }
  const handleAddBlog = async ({ title, author, url }) => {

    try {
      const addedBlog = await blogService.postBlog({
        title,
        author,
        url
      }, user.token)
      setBlogs(blogs => [...blogs, addedBlog])
      notyf.success('Added blog successfully')
    } catch (exception) {
      notyf.error('Wrong blog inputs')
    }
  }
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    notyf.success('Logged out successfully')
  }

  useEffect(() => {
    user && blogService.getAll(user.token).then(blogs =>
      setBlogs(blogs)
    )
  }, [user])


  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </Togglable>
  )

  const renderBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} notyf={notyf} handleDeleteBlog={handleDeleteBlog} user={user} handleLike={handleLike} />
      )}
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      <h2>Hello {user
        ? (<span>{user.name} <button onClick={logout}>logout</button></span>)
        : 'guest'}</h2>
      {user !== null && (
        <div>
          {renderBlogs()}
          <Togglable buttonLabel="Create new blog"><BlogForm handleAddBlog={handleAddBlog} /></Togglable>
        </div>
      )}

    </div>
  )
}

export default App