import axios from 'axios'
import { FormEvent, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>('')
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault()
    const res = await axios.post(
      '/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(res)
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br></br>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login
