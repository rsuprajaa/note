import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImage from '../assets/notfound.png'
import Meta from '../components/Meta/MetaData'

const NotFound = () => {
  return (
    <main className="w-6/12 mx-auto text-center mt-28">
      <Meta title="Not Found | Notely" />
      <img src={ErrorImage} alt="Not Found" className="object-cover" />
      <p className="text-xl font-medium">The page you are looking for doesn't exist</p>
      <Link to="/" className="text-lg font-medium ">
        <span className="text-blue-700 underline">Back to Home</span>
      </Link>
    </main>
  )
}

export default NotFound
