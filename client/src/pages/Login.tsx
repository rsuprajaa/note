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
    <div className="w-screen min-h-screen mx-auto">
      <div className="w-2/6 px-8 py-12 m-auto mt-28">
        <h1 className="px-4 mb-4 text-4xl font-bold text-center">Login</h1>
        <form onSubmit={loginHandler}>
          <label>Email</label>
          <input
            className="block w-full px-3 py-1 border-2 border-primary-light"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br></br>
          <label>Password</label>
          <input
            className="block w-full px-3 py-1 border-2 border-primary-light"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-2 py-1 mt-4 font-medium tracking-wide text-white bg-blue-800 rounded"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
