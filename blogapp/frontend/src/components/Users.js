import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const userList = useSelector(state => state.users)

  if (userList) {
    return (
      <div>
        <h2>USERS</h2>
        <Table striped>
          <tbody>
            <tr>
              <th>name</th>
              <th>blogs created</th>
            </tr>
            {userList.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}
export default Users
