import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getFavorites } from '../../apiCalls/favorites'
import { createFolder, getFolders } from '../../apiCalls/folder'
import { notesShared } from '../../apiCalls/notes'
import { Favorite, Folder, UserRole } from '../../types'

const Sidebar = () => {
  const [folders, setFolders] = useState<void | Folder[]>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [favorites, setFavorites] = useState<Favorite[] | void>()
  const [roles, setRoles] = useState<UserRole[] | void>()

  const history = useHistory()

  useEffect(() => {
    getFolders().then(res => {
      setFolders(res)
    })
    getFavorites().then(res => {
      setFavorites(res)
    })
    notesShared().then(res => {
      setRoles(res)
    })
  }, [])

  const createFolderHandler = async () => {
    createFolder().then(res => {
      history.push(`/folder/${res?.id}`)
    })

    getFolders().then(res => {
      setFolders(res)
    })
  }

  return (
    <>
      <div
        className={`break-all box-border w-56 min-h-full py-4 position-fixed bg-basic-100 text-primary-light font-medium ${
          showSidebar && 'transition-all duration-200 ease-in'
        }`}
      >
        <div>
          <div className="px-2">
            <div className="float-right text-lg">
              <i
                className="cursor-pointer fas fa-chevron-left text-basic-150"
                onClick={() => setShowSidebar(!showSidebar)}
              ></i>
            </div>
            <h1>LOGO</h1>
          </div>
          <button
            className="block w-9/12 px-4 py-2 m-auto my-4 font-medium text-center text-white bg-blue-800 rounded hover:bg-blue-700"
            onClick={createFolderHandler}
          >
            <i className="fas fa-plus"></i> New Folder
          </button>

          <div className="px-2 py-1 my-2 text-xs font-bold uppercase cursor-pointer hover:bg-basic-50">
            <Link to={`/shared-with-me`}>
              <i className="font-bold text-red-400 fas fa-heart"></i> Shared Notes
            </Link>
          </div>
          {roles &&
            roles.map(role => (
              <Link
                to={`/notes/${role.resource.id}`}
                key={role.id}
                className="block px-4 py-1 my-1 text-sm hover:bg-basic-50"
              >
                <i className="far fa-file-alt"></i> {role.resource.title}
              </Link>
            ))}
          <div className="px-2 py-1 my-2 text-xs font-bold uppercase cursor-pointer hover:bg-basic-50">
            <Link to={`/favorites`}>
              <i className="font-bold text-red-400 fas fa-heart"></i> Favorites
            </Link>
          </div>
          <>
            {favorites &&
              favorites.map(favorite => (
                <Link
                  to={`/notes/${favorite.note.id}`}
                  key={favorite.id}
                  className="block px-4 py-1 my-1 text-sm hover:bg-basic-50"
                >
                  <i className="far fa-file-alt"></i> {favorite.note.title}
                </Link>
              ))}
          </>
          <div className="px-2 py-1 my-2 text-xs font-bold uppercase cursor-pointer hover:bg-basic-50">
            Folders
            {folders && (
              <span className="text-xs font-normal capitalize">
                ({folders.length} {folders.length === 1 ? 'folder' : 'folders'})
              </span>
            )}
          </div>
          <>
            {folders &&
              folders.map(folder => (
                <Link to={`/folder/${folder.id}`} key={folder.id} className="block px-4 py-2 my-1 hover:bg-basic-50">
                  <i className="far fa-folder-open text-basic-150"></i> {folder.name}
                </Link>
              ))}
          </>
        </div>
      </div>
    </>
  )
}

export default Sidebar
