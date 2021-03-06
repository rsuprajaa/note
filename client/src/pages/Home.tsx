import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../apiCalls/auth'
import HomeImg from '../assets/home.png'
import Toast from '../components/Alert/Toast'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import { useAuth } from '../context/UserContext'

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { state, dispatch } = useAuth()
  const history = useHistory()
  const guestUserLogin = () => {
    login('jack@example.com', '123456')
      .then(res => {
        setLoading(true)
        dispatch({ type: 'LOGIN', payload: res.data })
        history.push('/workspace')
        setError('')
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        setError('Something wrong happened')
      })
  }
  return (
    <div className="max-w-full max-h-screen text-center">
      <Meta title="Home | Notely" />
      {loading && <Loader center={true} />}
      {error && <Toast message={error} variant="error" />}
      {!state.authenticated && (
        <nav className="h-20">
          <ul className="flex float-right mt-5 text-sm">
            <li className="px-2.5 py-1.5 mx-4 text-base cursor-pointer" onClick={() => history.push('/login')}>
              Log In
            </li>
            <li
              className="px-2.5 py-1.5 mx-4 text-base text-white bg-black cursor-pointer"
              onClick={() => history.push('/register')}
            >
              Sign Up
            </li>
          </ul>
        </nav>
      )}
      <main
        className={`flex content-center justify-around mt-20 md:mt-32 ${
          state.authenticated ? 'mt-24 md:mt-36' : 'mt-28 md:mt-40'
        }`}
      >
        <div className="flex flex-col self-center py-3">
          <h1 className="flex flex-col my-3 mt-5 text-5xl font-bold ">
            <span>Notely</span>
            <span>collaborative note-taking app</span>
          </h1>
          <button
            onClick={() => history.push('/workspace')}
            className="self-center px-2.5 py-1.5 mt-4 text-white bg-green-800"
          >
            Go to workspace <i className="text-xs fas fa-chevron-right"></i>
            <i className="text-xs fas fa-chevron-right"></i>
          </button>
          {!state.authenticated && (
            <button onClick={guestUserLogin} className="self-center px-2.5 py-1.5 mt-4 text-white bg-green-800">
              Login as guest user
            </button>
          )}
        </div>
        <img src={HomeImg} alt="home" className="hidden w-4/12 object-fit lg:block" />
      </main>
    </div>
  )
}

export default Home
