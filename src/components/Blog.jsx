import React, { useState } from 'react'
import Togglable from './Togglabe'

const Blog = ({ blog, handleDeleteBlog, user, handleLike }) => {

  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    display: 'flex',
  }

  return (
    <div style={blogStyle}>
      <div className="basic-details">
        {blog.title} {blog.author}
      </div>
      <Togglable className="extra-info" buttonLabel="Show more">
        <br />
        <span className='blog-url'>{blog.url}</span>
        <br />
        <span className='blog-title'>{blog.title}</span>
        <br />
        <span className='blog-likes'>{likes}</span>
        <button id="like-btn" onClick={() => { handleLike(blog.id, setLikes) }}>Like</button>
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