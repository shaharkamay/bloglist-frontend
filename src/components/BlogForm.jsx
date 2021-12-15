import React, { useRef } from 'react'
import blogService from '../services/blogs'


function BlogForm({ blogs, setBlogs, notyf }) {

  const titleInput = useRef();
  const authorInput = useRef();
  const urlInput = useRef();

  const handleAddBlog = async (event) => {
    event.preventDefault();

    try {
      const addedBlog = await blogService.postBlog({
        title: titleInput.current.value,
        author: authorInput.current.value,
        url: urlInput.current.value
      });
      setBlogs(blogs => [...blogs, addedBlog]);
      notyf.success("Added blog successfully");
    } catch (exception) {
      notyf.error('Wrong blog inputs');
    }
  }

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleAddBlog}>
        <input
          ref={titleInput}
          placeholder="Title"
        />
        <input
          ref={authorInput}
          placeholder="Author"
        />
        <input
          ref={urlInput}
          placeholder="Url"
        />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
