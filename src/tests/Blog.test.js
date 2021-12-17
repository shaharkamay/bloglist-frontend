import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'



describe('blog display', () => {
  const blog = {
    title: 'first react test',
    author: 'netanya',
    url: 'https://www.linkedin.com/in/nadav-vol-46ab67220/',
    userId: '61b8c3c4cbfee92864a731e3',
  }
  const handleLike = jest.fn().mockName('handleLike')
  const handleDeleteBlog = jest.fn().mockName('handleDeleteBlog')
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />)
  })
  test('should render basic details for each blog', () => {
    const basicDetailsDiv = component.container.querySelector('.basic-details')
    const extraDetailsDiv = component.container.querySelector('.extra-info')
    expect(component.container).toHaveTextContent('first react test')
    expect(basicDetailsDiv).not.toHaveStyle('display: none')
    expect(extraDetailsDiv).toHaveStyle('display:none')
  })
  test('should show extra info when button read more is pressed', () => {
    const button = component.getByText('Show more')
    fireEvent.click(button)
    const extraDetailsDiv = component.container.querySelector('.extra-info')
    expect(extraDetailsDiv).not.toHaveStyle('display:none')
  })
  test('if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const likeButton = component.getByText('Like', { selector: 'button' })

    likeButton.click()
    likeButton.click()

    expect(handleLike).toHaveBeenCalledTimes(2)
  })

  test('should add blog when addBlog ', async () => {

    const mockHandler = jest.fn()

    const { getByPlaceholderText, container } = render(
      <BlogForm handleAddBlog={mockHandler} />
    )

    const form = container.querySelector('.blog-form')
    const titleInput = getByPlaceholderText('Title')
    const authorInput = getByPlaceholderText('Author')
    const urlInput = getByPlaceholderText('Url')

    fireEvent.change(titleInput, {
      target: { value: blog.title },
    })
    fireEvent.change(authorInput, {
      target: { value: blog.author },
    })
    fireEvent.change(urlInput, {
      target: { value: blog.url },
    })

    fireEvent.submit(form)

    expect(mockHandler).toHaveBeenCalledWith({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })
  })
})