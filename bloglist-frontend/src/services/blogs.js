import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseUrl +'/'+ updateObject.id, updateObject, config)
  return response.data
}

const dellaus = async delteobject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl +'/'+ delteobject.id, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a,b) => b.likes - a.likes))
}

export default { setToken, create, update, dellaus, getAll }