/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`, config())
}
const comment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, create, update, remove, comment }
