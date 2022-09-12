import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.2em solid #ffffff;
  color: black;
  text-align: center;

  :hover {
     color: #d93098;
     background-color: #ffffff;
  }
`
const Container = styled.div`
  text-align: center;
  padding-top: 25px;
  height: 100vh;
  background: radial-gradient(#a23982, #d93098);
`
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <Container>
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div>username</div>
            <input
              value={username}
              placehoder="username"
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </div>
          <div>password</div>
          <div>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </div>
          <Button id="login-button" type="submit">
            login
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
