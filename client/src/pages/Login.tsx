import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../apiCalls/auth'
import Alert from '../components/Alert/Alert'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import { useAuth } from '../context/UserContext'
import { validEmail, validInput } from '../utils/validation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { dispatch } = useAuth()

  const history = useHistory()
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!validEmail(email)) {
      setError('Enter a valid email address')
      return
    }
    if (!validInput(password)) {
      setError('Please enter your password')
      return
    }
    setLoading(true)
    login(email, password)
      .then(res => {
        dispatch({ type: 'LOGIN', payload: res.data })
        history.push('/workspace')
      })
      .catch(err => {
        setError(err.response.data.message)
      })
    setLoading(false)
  }

  return (
    <div className="w-screen min-h-screen mx-auto">
      <Link to="/" className="block px-6 py-4 text-xl font-semibold">
        Home
      </Link>
      <Meta title="Login | Notely" />
      <div className="px-8 py-12 m-auto md:w-3/6 lg:w-2/6 mt-28">
        <h1 className="px-4 mb-4 text-4xl font-bold text-center">Login</h1>
        {loading && <Loader center={true} />}
        {error && <Alert message={error} variant="error" />}

        <form onSubmit={loginHandler} noValidate>
          <label>Email</label>
          <input
            className="block w-full px-3 py-1 border-2 border-primary-light"
            type="email"
            placeholder="jack@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br></br>
          <label>Password</label>
          <input
            placeholder="123456"
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
          <p className="mt-2 font-medium">
            Don't have an account?{' '}
            <Link className="text-blue-800" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
        <p className="mt-2 underline">Guest user credentials</p>
        <p>
          email: <span className="font-medium">jack@example.com</span>
        </p>
        <p>
          password: <span className="font-medium">123456</span>
        </p>
      </div>
    </div>
  )
}

export default Login
