import { useDispatch } from 'react-redux'
import { blogComment } from '../reducers/blogReducer'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()

  const handleComment = async event => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    if (comment) {
      dispatch(blogComment(comment, blog.id))
    }
  }

  return (
    <div>
      <form onSubmit={handleComment}>
        <input name="comment" id="username" />
        <button type="submit">add comment</button>
      </form>
      <div>
        {blog.comments.map(comment => (
          <li key={Math.random() * 19999}>{comment}</li>
        ))}
      </div>
    </div>
  )
}

export default Comment
