import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../apiCalls/auth'
import Alert from '../components/Alert/Alert'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import { useAuth } from '../context/UserContext'
import { validEmail, validInput, validPassword } from '../utils/validation'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()
  const { dispatch } = useAuth()

  const registerHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!validEmail(email)) {
      setError('Enter a valid email address')
      return
    }
    if (!validInput(name)) {
      setError('Please enter your name')
      return
    }
    if (!validPassword(password)) {
      setError('Password should have 6 or more characters')
      return
    }
    setLoading(true)
    register(name, email, password)
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
      <Meta title="Register | Notely" />
      <div className="px-8 py-12 m-auto md:w-3/6 lg:w-2/6 mt-28">
        <h1 className="px-4 mb-4 text-4xl font-bold text-center">Register</h1>
        {loading && <Loader center={true} />}
        {error && <Alert message={error} variant="error" />}
        <form onSubmit={registerHandler}>
          <label>Email</label>
          <input
            className="block w-full px-3 py-1 border-2 border-primary-light"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br></br>
          <label>Name</label>
          <input
            className="block w-full px-3 py-1 border-2 border-primary-light"
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
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
            Sign Up
          </button>
          <p className="mt-2 font-medium">
            Already Have an account?{' '}
            <Link className="text-blue-800" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
