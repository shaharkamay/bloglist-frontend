import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl, {
    headers: {
      authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inppdi5zZXJwaG9zIiwiaWQiOiI2MWI4ZTIzNmZjZjYxYmE5NGUwOTQ3YzEiLCJpYXQiOjE2Mzk1MTU0OTB9.u-FUpI7zC9ow4d7kqQxVYVvPj5briL-xpKTe9q4Ovg4"
    }
  })
  return request.data;
}

const postBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, {
    headers: {
      authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inppdi5zZXJwaG9zIiwiaWQiOiI2MWI4ZTIzNmZjZjYxYmE5NGUwOTQ3YzEiLCJpYXQiOjE2Mzk1MTU0OTB9.u-FUpI7zC9ow4d7kqQxVYVvPj5briL-xpKTe9q4Ovg4"
    }
  });
  return res.data;
}

const blogService = { getAll, postBlog };
export default blogService;