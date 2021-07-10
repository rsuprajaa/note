import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../apiCalls/auth'
import { getFavorites } from '../../apiCalls/favorites'
import { createFolder, getFolders } from '../../apiCalls/folder'
import { notesShared } from '../../apiCalls/notes'
import { Favorite, Folder, UserRole } from '../../types'
import Loader from '../Loader/Loader'

const Sidebar = () => {
  const [folders, setFolders] = useState<void | Folder[]>([])
  const [foldersLoading, setFoldersLoading] = useState<boolean>(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [favorites, setFavorites] = useState<Favorite[] | void>()
  const [favoritesLoading, setFavoritesLoading] = useState<boolean>(true)
  const [roles, setRoles] = useState<UserRole[] | void>()
  const [rolesLoading, setRolesLoading] = useState<boolean>(true)

  const history = useHistory()

  useEffect(() => {
    getFolders().then(res => {
      setFolders(res)
      setFoldersLoading(false)
    })
    getFavorites().then(res => {
      setFavorites(res)
      setFavoritesLoading(false)
    })
    notesShared().then(res => {
      setRoles(res)
      setRolesLoading(false)
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

  const logoutHandler = () => {
    logout().then(res => {
      history.push('/login')
    })
  }

  return (
    <>
      {showSidebar ? (
        <div className="box-border w-56 min-h-screen py-4 font-medium break-all transition-all duration-200 ease-in select-none position-fixed bg-basic-100 text-primary-light">
          <div>
            <div className="flex justify-end mx-2 my-2">
              <button className="px-3 py-1 font-medium rounded hover:bg-basic-50" onClick={logoutHandler}>
                Logout
              </button>
            </div>
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
              <Link to={`/shared-with-me`}>Shared With me</Link>
              {rolesLoading && <Loader />}
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
              <Link to={`/favorites`}>Favorites</Link>
              {favoritesLoading && <Loader />}
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
            <div className="px-2 py-1 mt-2 text-xs font-bold uppercase cursor-pointer hover:bg-basic-50">
              Folders
              {foldersLoading && <Loader />}
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
      ) : (
        <div className="mt-8 text-lg">
          <i
            className="cursor-pointer fas fa-chevron-left text-basic-150"
            onClick={() => setShowSidebar(!showSidebar)}
          ></i>
        </div>
      )}
    </>
  )
}

export default Sidebar
