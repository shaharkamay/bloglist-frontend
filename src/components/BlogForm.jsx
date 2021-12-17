import React, { useRef } from 'react'


function BlogForm({ handleAddBlog }) {

  const titleInput = useRef()
  const authorInput = useRef()
  const urlInput = useRef()

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleAddBlog({
          title: titleInput.current.value,
          author: authorInput.current.value,
          url: urlInput.current.value
        })
      }} className="blog-form">
        <input
          id='title'
          ref={titleInput}
          placeholder="Title"
        />
        <input
          id='author'
          ref={authorInput}
          placeholder="Author"
        />
        <input
          id='url'
          ref={urlInput}
          placeholder="Url"
        />
        <button id='add-blog-btn' type="submit" className='add-blog-btn'>Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
