import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteFolder, updateFolder } from '../../apiCalls/folder'
import { Folder } from '../../types'

interface AppProps {
  folder: Folder
  savedName: string | void
  setSavedName: React.Dispatch<React.SetStateAction<string | void>>
  folderName: string | void
  setFolderName: React.Dispatch<React.SetStateAction<string | void>>
}

const FolderToolbar = (props: AppProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { folder, savedName, setSavedName, folderName, setFolderName } = props
  const history = useHistory()

  const saveFolderHandler = () => {
    if (savedName !== folderName && folderName && folderName.trim().length > 2) {
      updateFolder(folder.id, folderName).then(res => {})
      setSavedName()
    }
  }

  const deleteFolderHandler = () => {
    deleteFolder(folder.id).then(res => {
      history.push('/workspace')
    })
  }

  return (
    <nav className="px-4 py-3 text-primary-light">
      <div className="float-left">
        <span className="px-2 py-1 mr-1 rounded cursor-pointer hover:bg-basic-50">{folder.name}</span>
      </div>
      <div className="float-right">
        <span className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50" onClick={() => saveFolderHandler}>
          Save
        </span>
        <span
          className="px-2 py-1 ml-1 rounded cursor-pointer text-primary-default hover:bg-basic-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </span>
        {menuOpen && (
          <ul className="absolute flex flex-col justify-center py-2 mr-3 bg-white shadow-custom text-primary-light w-60 right-1 top-12">
            <li className="flex-grow px-3 py-1 cursor-pointer hover:bg-basic-50" onClick={deleteFolderHandler}>
              Delete
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default FolderToolbar
