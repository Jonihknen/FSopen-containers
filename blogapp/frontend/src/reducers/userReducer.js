import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserState(state, action) {
      return (state = action.payload)
    },
    removeUserState(state, action) {
      return (state = action.payload)
    },
    setUsers(state, action) {
      return (state = action.payload)
    }
  }
})

export const setUser = user => {
  return async dispatch => {
    userService.setUser(user)
    dispatch(setUserState(user))
  }
}
export const removeUser = () => {
  return async dispatch => {
    userService.clearUser()
    dispatch(removeUserState(null))
  }
}
export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch(setUsers(users))
}

export const { setUserState, loginUser, removeUserState, setUsers } =
  userSlice.actions

export default userSlice.reducer
