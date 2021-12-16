import React, { useState } from 'react'
import Togglable from './Togglabe'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDeleteBlog, notyf, user }) => {

  const [likes, setLikes] = useState(blog.likes)

  const incrementLikes = async (blogId) => {
    const updatedBlog = await blogService.incrementLikes(blogId)
    setLikes(updatedBlog.likes)
    notyf.success('Liked successfully!')
  }

  const blogStyle = {
    display: 'flex',
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="Show more">
        <br />
        {blog.url}
        <br />
        {blog.title}
        <br />
        {likes}
        <button onClick={() => { incrementLikes(blog.id) }}>Like</button>
        <br />
        {blog.user && blog.user.id === user.id
          ? <button style={{ background: 'red', color: 'white' }} onClick={() => {
            const answer = window.confirm('message')
            if (answer) handleDeleteBlog(blog.id)
            else return
          }}>Delete</button>
          : ''}

      </Togglable>
    </div>
  )
}

export default Blog