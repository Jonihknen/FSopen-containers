import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogList = useSelector(state => state.blogs)
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1
  }
  if (blogList) {
    return blogList.map(blog => (
      <div style={style} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {' '}
          {blog.title} - {blog.author}
        </Link>
      </div>
    ))
  }
}

export default Blogs
