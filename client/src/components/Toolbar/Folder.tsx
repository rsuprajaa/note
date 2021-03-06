import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteFolder, updateFolder } from '../../apiCalls/folder'
import { getAllTags } from '../../apiCalls/tags'
import { Folder, Note, Tag } from '../../types'
import useOnClickOutside from '../../utils/useClickOutside'
import { validInput } from '../../utils/validation'
import Modal from '../Alert/Modal'
import Loader from '../Loader/Loader'
import TagsToolbarMenu from '../Tags/TagsToolbarMenu'

interface FolderProps {
  folder: Folder
  savedName: string | void
  setSavedName: React.Dispatch<React.SetStateAction<string>>
  folderName: string | void
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  saveLoader: boolean
  setSaveLoader: Dispatch<SetStateAction<boolean>>
  setNotes: Dispatch<SetStateAction<void | Note[] | undefined>>
}

const FolderToolbar = (props: FolderProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { folder, savedName, setSavedName, folderName, setSaveLoader, saveLoader, setNotes } = props
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [deleteAction, setDeleteAction] = useState<boolean>(false)
  const [queryMenu, setQueryMenu] = useState<boolean>(false)
  const [allTags, setAllTags] = useState<Tag[] | void>()

  const history = useHistory()

  const saveFolderHandler = () => {
    if (savedName !== folderName && folderName && validInput(folderName)) {
      setSaveLoader(true)
      updateFolder(folder.id, folderName).then(res => {
        setSaveLoader(false)
        setSavedName(folderName)
      })
    }
  }

  const deleteFolderHandler = () => {
    setDeleteModal(true)
  }

  useEffect(() => {
    if (deleteAction) {
      deleteFolder(folder.id).then(res => {
        history.push('/workspace')
      })
    }
  }, [deleteAction, history])

  useEffect(() => {
    getAllTags()
      .then(res => setAllTags(res))
      .catch(err => console.log(err))
  }, [])

  const menuRef = useRef(null)
  const queryMenuRef = useRef(null)
  useOnClickOutside(menuRef, () => setMenuOpen(false))
  useOnClickOutside(queryMenuRef, () => setQueryMenu(false))

  return (
    <div className="px-4 py-3 select-none text-primary-light">
      {deleteModal && (
        <Modal
          title="Are you sure you want to delete the folder?"
          actionValue={deleteAction}
          setActionValue={setDeleteAction}
          action="Delete"
          variant="error"
          body="Are you sure you want to delete your folder. This
          action cannot be undone."
          setModal={setDeleteModal}
        />
      )}
      <div className="md:float-left">
        <span className="px-2 py-1 mr-1 rounded cursor-pointer hover:bg-basic-50">{folder.name}</span>
      </div>
      <div className="flex justify-between md:float-right">
        <span
          onClick={() => setQueryMenu(!queryMenu)}
          className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50"
        >
          Search by tags
        </span>
        {queryMenu && (
          <div
            ref={queryMenuRef}
            className="absolute flex flex-col justify-center py-4 mr-3 overflow-auto bg-white max-h-80 shadow-custom text-primary-light w-60 right-5 top-12"
          >
            {' '}
            {allTags ? (
              allTags.map(tag => {
                return (
                  <>
                    <TagsToolbarMenu setNotes={setNotes} tag={tag} folder={folder} />
                  </>
                )
              })
            ) : (
              <p className="mx-2">No tags</p>
            )}
          </div>
        )}
        <span className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50" onClick={saveFolderHandler}>
          Save
        </span>
        <span
          className="px-2 py-1 ml-1 rounded cursor-pointer text-primary-default hover:bg-basic-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </span>
        {menuOpen && (
          <ul
            ref={menuRef}
            className="absolute flex flex-col justify-center py-2 mr-3 bg-white shadow-custom text-primary-light w-60 right-1 top-12"
          >
            <li className="flex-grow px-3 py-1 cursor-pointer hover:bg-basic-50" onClick={deleteFolderHandler}>
              Delete
            </li>
          </ul>
        )}
        {saveLoader && (
          <div className="absolute w-20 right-4">
            <Loader message="Saving" />
          </div>
        )}
      </div>
    </div>
  )
}

export default FolderToolbar
