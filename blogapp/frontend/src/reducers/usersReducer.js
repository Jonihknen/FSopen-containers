import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return (state = action.payload)
    }
  }
})

export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch(setUsers(users))
}

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
