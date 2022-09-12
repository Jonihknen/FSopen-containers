import { useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import loginService from './services/login'
import userService from './services/user'

import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  newblog,
  likeBlogRedux,
  deleteBlog
} from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        dispatch(setUser(user))
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const logout = () => {
    dispatch(removeUser())
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async blog => {
    await dispatch(newblog(blog))
      .then(b => {
        notify(`a new blog '${blog.title}' by ${blog.author} added`)
        blogFormRef.current.toggleVisibility()
      })
      .catch(error => {
        notify('creating a blog failed: ' + error, 'alert')
      })
  }

  const removeBlog = blog => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if (!ok) {
      return
    }
    dispatch(deleteBlog(blog.id))
    notify(`${blog.title} by ${blog.author} deleted`)
  }

  const likeBlog = async blog => {
    await dispatch(likeBlogRedux(blog))
    notify(`you liked '${blog.title}' by ${blog.author}`)
  }

  const notify = (message, type = 'info') => {
    dispatch(addNotification(message, type))
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} notification={notification} />
      </>
    )
  }
  const padding = {
    padding: 5
  }
  const style = {
    backgroundColor: '#e1e3e3'
  }
  return (
    <Router>
      <div className="container-fluid" style={style}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">
                  blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user.name} logged in{' '}
              </Nav.Link>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={logout}
              >
                {' '}
                logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route
            path="/blogs"
            element={
              <div>
                <Notification notification={notification} />
                <h2>blog app</h2>
                <div>
                  {
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                      <NewBlogForm onCreate={createBlog} />
                    </Togglable>
                  }
                </div>
                <div>
                  <Blogs />
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route
            path="/blogs/:blogId"
            element={
              <div>
                <div>
                  {' '}
                  <Notification notification={notification} />
                </div>
                <Blog addLike={likeBlog} removeBlog={removeBlog} />
              </div>
            }
          />
          <Route path="/" element={'Helloo'} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
