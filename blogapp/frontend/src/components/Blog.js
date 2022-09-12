import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Comment from './Comment'

const Blog = ({ addLike, removeBlog }) => {
  let { blogId } = useParams()
  const blog = useSelector(state =>
    state.blogs.find(blog => blog.id === blogId)
  )
  const navigate = useNavigate()

  const loggedUser = useSelector(state => state.user.username)

  let removeButtonVisible
  if (blog) {
    removeButtonVisible = {
      display: blog.user.username === loggedUser ? '' : 'none'
    }
  }

  if (blog) {
    return (
      <div>
        <h1>{blog.title}</h1>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{' '}
          <button
            onClick={function () {
              addLike(blog)
            }}
          >
            {' '}
            like
          </button>
        </div>
        <div>added by {blog.user.name} </div>
        <button
          style={removeButtonVisible}
          onClick={function () {
            removeBlog(blog)
            navigate('/blogs')
          }}
        >
          delete blog
        </button>
        <div>
          <h2>comments</h2>
        </div>
        <div>
          <Comment blog={blog} />
        </div>
      </div>
    )
  }
  return <div>No blog found</div>
}

export default Blog
