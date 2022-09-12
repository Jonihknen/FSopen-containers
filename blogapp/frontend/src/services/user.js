/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = user => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByID = async id => {
  const response = await axios.get(`baseUrl/${id}`)
  return response.data
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
  getAll,
  getByID
}
