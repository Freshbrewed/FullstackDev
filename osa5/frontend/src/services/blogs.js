import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('token', token)
  const config = { 
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, login }