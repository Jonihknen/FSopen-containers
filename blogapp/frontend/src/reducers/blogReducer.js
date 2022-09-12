import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return (state = action.payload)
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    addLike(state, action) {
      const blogList = state.map(a =>
        a.id !== action.payload.id ? a : action.payload
      )
      return blogList.sort(byLikes)
    },
    addComment(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    }
  }
})

export const newblog = data => {
  return async dispatch => {
    const blog = await blogService.create(data)
    dispatch(addBlog(blog))
  }
}
export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}
export const likeBlogRedux = blog => async dispatch => {
  const liked = {
    ...blog,
    likes: (blog.likes || 0) + 1,
    user: blog.user.id
  }
  const updatedBlog = await blogService.update(blog.id, liked)
  dispatch(addLike(updatedBlog))
}
export const deleteBlog = id => async dispatch => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}
export const blogComment = (comment, id) => async dispatch => {
  const updatedBlog = await blogService.comment(comment, id)
  dispatch(addComment(updatedBlog))
}

export const { addBlog, setBlogs, addLike, removeBlog, addComment } =
  blogSlice.actions

export default blogSlice.reducer
