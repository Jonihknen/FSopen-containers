import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  let { userId } = useParams()
  const user = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  if (user.blogs.length > 0) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <h1>{user.name}</h1>
      {user.name} has not added any blogs yet
    </div>
  )
}

export default User
