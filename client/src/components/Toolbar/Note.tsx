import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { checkFavorite, toggleFavorite } from '../../apiCalls/favorites'
import { addPermission, deleteNote, getNote, updateNote } from '../../apiCalls/notes'
import { useAuth } from '../../context/UserContext'
import { Folder, Note, UserRole } from '../../types'
import useOnClickOutside from '../../utils/useClickOutside'
import { validEmail, validInput } from '../../utils/validation'
import Alert from '../Alert/Alert'
import Modal from '../Alert/Modal'
import Loader from '../Loader/Loader'
import MemberCard from '../Note/MemberCard'

interface AppProps {
  note: Note
  folder: Folder
  body: string
  title: string
  savedBody: string
  savedName: string
  setSavedBody: Dispatch<SetStateAction<string>>
  setSavedName: Dispatch<SetStateAction<string>>
  setNote: Dispatch<SetStateAction<void | Note | undefined>>
  saveLoader: boolean
  setSaveLoader: Dispatch<SetStateAction<boolean>>
}

const NoteToolbar = (props: AppProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [shareMenu, setShareMenu] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [shareLoading, setShareLoading] = useState<boolean>(false)
  const [deleteAction, setDeleteAction] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [author, setAuthor] = useState<UserRole | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const history = useHistory()
  const { state } = useAuth()
  const loggedInUser = state.user

  const {
    savedBody,
    savedName,
    folder,
    body,
    setSavedName,
    title,
    setSavedBody,
    note,
    setNote,
    saveLoader,
    setSaveLoader,
  } = props

  useEffect(() => {
    note.userRole.map(role => {
      if (role.permission === 'owner') {
        setAuthor(role)
      }
    })
    if (author && loggedInUser && author.user.id === loggedInUser.id) {
      setAuthenticated(true)
    }
  }, [note, loggedInUser, author])

  const saveNoteHandler = () => {
    if ((savedName !== title && validInput(title)) || savedBody !== body) {
      setSaveLoader(true)
      updateNote(note.id, body, title).then(res => {
        setSaveLoader(false)
      })
      setSavedBody(body)
      setSavedName(title)
    }
  }

  const deleteNoteHandler = () => {
    setDeleteModal(true)
  }

  useEffect(() => {
    if (deleteAction) {
      deleteNote(note.id).then(res => {
        history.push('/workspace')
      })
    }
  }, [deleteAction])

  useEffect(() => {
    checkFavorite(note.id).then(res => {
      setFavorite(res || false)
    })
  }, [note.id])

  const favoriteHandler = () => {
    if (!favorite) {
      toggleFavorite(note.id).then(res => {
        setFavorite(true)
      })
    } else {
      toggleFavorite(note.id).then(res => {
        setFavorite(false)
      })
    }
  }

  const shareHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validEmail(email)) {
      setError('Enter a valid email address')
      return
    }
    setShareLoading(true)
    addPermission(note.id, email || '')
      .then(res => {
        setEmail('')
        getNote(note.id).then(res => {
          setNote(res)
        })
      })
      .catch(err => {
        setError(err.response.data.message)
      })
    setShareLoading(false)
  }

  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setMenuOpen(false))

  return (
    <div className="px-4 py-3 select-none text-primary-light">
      {deleteModal && (
        <Modal
          title="Are you sure you want to delete the note?"
          actionValue={deleteAction}
          setActionValue={setDeleteAction}
          action="Delete"
          variant="error"
          body="Are you sure you want to delete your note. This
          action cannot be undone."
          setModal={setDeleteModal}
        />
      )}
      <div className="float-left">
        {authenticated && (
          <>
            <span
              className="px-2 py-1 mr-1 rounded cursor-pointer hover:bg-basic-50"
              onClick={() => history.push(`/folder/${folder.id}`)}
            >
              {folder.name}
            </span>
            <span> / </span>
          </>
        )}
        <span className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50">{note.title}</span>
      </div>
      <div className="float-right">
        {authenticated && (
          <>
            <span
              className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50"
              onClick={() => setShareMenu(!shareMenu)}
            >
              Share
            </span>
            {shareMenu && (
              <ul className="absolute z-10 flex flex-col px-3 py-2 mr-3 overflow-hidden bg-white shadow-custom text-primary-light w-60 right-48 top-12">
                <form onSubmit={shareHandler} className="mb-2">
                  <input
                    type="text"
                    className="w-9/12 px-1 mr-2 text-base border-2 border-gray-300 rounded-md focus:outline-none"
                    value={email || ''}
                    placeholder="Add email"
                    onChange={e => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                  />
                  <button type="submit">
                    <i className="fas fa-plus"></i>
                  </button>
                </form>
                {error && <Alert message={error} variant="error" size="sm" />}
                {shareLoading && <Loader message="Adding" />}
                <div>
                  <p className="mt-2 text-base font-medium">Members</p>
                  <ul>
                    {note.userRole.map(role => (
                      <MemberCard setNote={setNote} key={role.id} role={role} />
                    ))}
                  </ul>
                </div>
              </ul>
            )}
          </>
        )}
        <button className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50" onClick={favoriteHandler}>
          {favorite ? (
            <span>
              <i className="mr-1 text-red-400 fas fa-heart"></i>Favorited
            </span>
          ) : (
            <span>
              <i className="mr-1 text-red-400 far fa-heart"></i>Favorite
            </span>
          )}
        </button>
        <button className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50" onClick={() => saveNoteHandler}>
          Save
        </button>
        {authenticated && (
          <>
            <button
              className="px-2 py-1 ml-1 rounded cursor-pointer text-primary-default hover:bg-basic-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            {menuOpen && (
              <ul
                ref={menuRef}
                className="absolute flex flex-col justify-center py-2 mr-3 bg-white shadow-custom text-primary-light w-60 right-1 top-12"
              >
                <li className="flex-grow px-3 py-1 cursor-pointer hover:bg-basic-50" onClick={deleteNoteHandler}>
                  Delete
                </li>
              </ul>
            )}
          </>
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

export default NoteToolbar
