import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  console.log(token)

  const request = await axios.get(baseUrl, {
    headers: {
      authorization: 'bearer ' + token
    }
  })
  return request.data
}

const postBlog = async (blog, token) => {
  const res = await axios.post(baseUrl, blog, {
    headers: {
      authorization: 'bearer ' + token
    }
  })
  return res.data
}

const incrementLikes = async (id, token) => {
  const res = await axios.put(`${baseUrl}/update`, { id }, {
    headers: {
      authorization: 'bearer ' + token
    }
  })
  return res.data
}

const deleteBlog = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      authorization: 'bearer ' + token
    }
  }, { id })
}

const blogService = { getAll, postBlog, incrementLikes, deleteBlog }
export default blogService