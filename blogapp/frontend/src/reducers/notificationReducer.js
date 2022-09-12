import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return (state = action.payload)
    }
  }
})
let timerID
export const addNotification = (message, type) => {
  return async dispatch => {
    await dispatch(setNotification({ message, type }))
    clearTimeout(timerID)
    timerID = setTimeout(function () {
      dispatch(setNotification(null))
    }, 5000)
  }
}

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
