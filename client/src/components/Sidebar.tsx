import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFolders } from '../api'
import { Folder } from '../types'

const Sidebar = () => {
  const [folders, setFolders] = useState<void | Folder[]>([])
  const [showFolders, setShowFolders] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    getFolders().then(res => {
      setFolders(res)
    })
  }, [])

  const createFolderHandler = async () => {
    await axios.post<Folder>('/folder')
    //redirect to created folder
    getFolders().then(res => {
      setFolders(res)
    })
  }

  return (
    <>
      {showSidebar ? (
        <div
          className={`box-border float-left w-64 min-h-screen px-8 py-8 position-fixed bg-basic-400 text-basic-100 ${
            showSidebar && 'transition-all duration-200 ease-in'
          }`}
        >
          <div>
            <div className="my-3">
              <div className="float-right text-lg">
                <i className="cursor-pointer fas fa-chevron-left" onClick={() => setShowSidebar(!showSidebar)}></i>
              </div>
              <h1>LOGO</h1>
            </div>
            <button
              className="block w-full px-4 py-3 my-3 font-medium text-left bg-blue-800 rounded hover:bg-blue-700 text-basic-50"
              onClick={createFolderHandler}
            >
              <i className="fas fa-plus"></i> Create new folder
            </button>
            <div
              className="px-2 py-2 my-1 font-bold rounded cursor-pointer hover:bg-basic-300"
              onClick={() => setShowFolders(!showFolders)}
            >
              {' '}
              {showFolders ? (
                <i className="pr-2 fas fa-caret-down text-basic-150"></i>
              ) : (
                <i className="pr-2 fas fa-caret-right text-basic-150"></i>
              )}
              Folders{' '}
              {!showFolders && folders && <span className="text-sm font-normal">({folders.length} folders)</span>}
            </div>
            {showFolders && (
              <>
                {folders &&
                  folders.map(folder => (
                    <Link
                      to={`/note/${folder.id}`}
                      key={folder.id}
                      className="block px-4 py-2 my-1 rounded hover:bg-basic-300"
                    >
                      <i className="far fa-folder-open text-basic-150"></i> {folder.name}
                    </Link>
                  ))}
              </>
            )}
            <Link to={`/favorites`} className="block px-2 py-2 my-1 rounded hover:bg-basic-300">
              <i className="text-yellow-400 fas fa-star"></i> Favorites
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <i className="cursor-pointer fas fa-chevron-right" onClick={() => setShowSidebar(!showSidebar)}></i>
        </div>
      )}
    </>
  )
}

export default Sidebar
