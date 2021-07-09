import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { checkFavorite, toggleFavorite } from '../../apiCalls/favorites'
import { addPermission, deleteNote, getNote, updateNote } from '../../apiCalls/notes'
import { createTag, getAllTags } from '../../apiCalls/tags'
import { Folder, Note, Tag } from '../../types'
import MemberCard from '../Note/MemberCard'

interface AppProps {
  note: Note
  folder: Folder
  body: string | void
  title: string | void
  savedBody: string | void
  savedName: string | void
  setSavedBody: Dispatch<SetStateAction<string | void>>
  setSavedName: Dispatch<SetStateAction<string | void>>
  setNote: Dispatch<SetStateAction<void | Note | undefined>>
}

const NoteToolbar = (props: AppProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [tagsMenu, setTagsMenu] = useState<boolean>(false)
  const [shareMenu, setShareMenu] = useState<boolean>(false)
  const [email, setEmail] = useState<string | void>('')
  const [tagName, setTagName] = useState<string | void>('')
  const [tags, setTags] = useState<Tag[] | void>()

  const history = useHistory()
  const { savedBody, savedName, folder, body, setSavedName, title, setSavedBody, note, setNote } = props

  const saveNoteHandler = () => {
    if (savedName !== title || savedBody !== body) {
      updateNote(note.id, body, title).then(res => {})
      setSavedBody(body)
      setSavedName(title)
    }
  }

  const deleteNoteHandler = () => {
    deleteNote(note.id).then(res => {
      history.push(`/folder/${folder.id}`)
    })
  }

  useEffect(() => {
    checkFavorite(note.id).then(res => {
      setFavorite(res || false)
    })
  }, [])

  useEffect(() => {
    getAllTags().then(res => {
      setTags(res)
    })
  }, [])

  const favoriteHandler = () => {
    console.log(favorite)
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

  const createTagHandler = () => {
    if (tagName) {
      createTag(tagName).then(res => {
        getAllTags().then(res => {
          setTags(res)
        })
        setTagName('')
      })
    }
  }

  const addTag = (e: MouseEventHandler<HTMLButtonElement>) => {}

  const shareHandler = () => {
    addPermission(note.id, email || '').then(res => {
      setEmail('')
      getNote(note.id).then(res => {
        setNote(res)
      })
    })
  }

  return (
    <nav className="px-4 py-3 text-primary-light">
      <div className="float-left">
        <span
          className="px-2 py-1 mr-1 rounded cursor-pointer hover:bg-basic-50"
          onClick={() => history.push(`/folder/${folder.id}`)}
        >
          {folder.name}
        </span>
        <span> / </span>
        <span className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50">{note.title}</span>
      </div>
      <div className="float-right">
        {/* CHECK USER ID AND DISPLAY */}
        <span
          className="px-2 py-1 ml-1 rounded cursor-pointer hover:bg-basic-50"
          onClick={() => setShareMenu(!shareMenu)}
        >
          Share
        </span>
        {shareMenu && (
          <ul className="absolute flex flex-col px-3 py-2 mr-3 overflow-hidden bg-white shadow-custom text-primary-light w-60 right-48 top-12">
            <div>
              <input
                type="text"
                className="px-1 mr-2 border-2 border-gray-300 rounded-md focus:outline-none"
                value={email || ''}
                placeholder="Add email"
                onChange={e => setEmail(e.target.value)}
              />
              <button onClick={shareHandler}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div>
              <p className="mt-2 font-medium">Members</p>
              <ul>
                {note.userRole.map(role => (
                  <MemberCard setNote={setNote} key={role.id} role={role} />
                ))}
              </ul>
            </div>
          </ul>
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
        <button
          className="px-2 py-1 ml-1 rounded cursor-pointer text-primary-default hover:bg-basic-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </button>
        {menuOpen && (
          <ul className="absolute flex flex-col justify-center py-2 mr-3 bg-white shadow-custom text-primary-light w-60 right-1 top-12">
            <li className="flex-grow px-3 py-1 cursor-pointer hover:bg-basic-50" onClick={deleteNoteHandler}>
              Delete
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NoteToolbar
