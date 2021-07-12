import { Link } from 'react-router-dom'
import Warning from '../../assets/warning.png'

const NotFound = ({ alt }: { alt: string }) => {
  return (
    <div className="w-5/12 mx-auto mt-32 text-center">
      <img src={Warning} alt={alt} className="object-fit" />
      <p className="text-lg font-medium">{alt}</p>
      <Link to="/" className="text-lg font-medium ">
        <span className="text-blue-700 underline">Back to Home</span>
      </Link>
    </div>
  )
}

export default NotFound
