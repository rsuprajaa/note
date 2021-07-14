import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getNote, updateNote } from '../apiCalls/notes'
import { createTag, getAllTags } from '../apiCalls/tags'
import Toast from '../components/Alert/Toast'
import NotFound from '../components/Error/NotFound'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import TagLabel from '../components/Tags/TagLabel'
import TagsMenu from '../components/Tags/TagsMenu'
import Editor from '../components/TextEditor/CKEditor'
import NoteToolbar from '../components/Toolbar/Note'
import { Note, NoteTag, Tag } from '../types'
import useOnClickOutside from '../utils/useClickOutside'
import { validInput } from '../utils/validation'

const AUTOSAVE_INTERVAL = 1000

const NotePage = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [note, setNote] = useState<Note | void>()
  const [noteLoading, setNoteLoading] = useState<boolean>(true)
  const [name, setName] = useState<string>('')
  const [savedName, setSavedName] = useState<string>('')
  const [savedBody, setSavedBody] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [saveLoader, setSaveLoader] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [tags, setTags] = useState<NoteTag[] | void>()
  const [tagsMenu, setTagsMenu] = useState<boolean>(false)
  const [allTags, setAllTags] = useState<Tag[] | void>()
  const [tagsError, setTagsError] = useState<string | void>()
  const [newTag, setNewTag] = useState<string>('')

  useEffect(() => {
    refreshNote(id)
    setNoteLoading(false)
  }, [id])

  const refreshNote = (id: string) => {
    getNote(id)
      .then(res => {
        setNote(res)
        setError('')
      })
      .catch(err => {
        setError('Note not found')
      })
  }

  useEffect(() => {
    if (note) {
      setBody(note.body)
      setName(note.title)
      setTags(note.noteTag)
    }
  }, [note])

  useEffect(() => {
    getAllTags()
      .then(res => setAllTags(res))
      .catch(err => console.log(err))
  }, [note])

  const addTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (validInput(newTag) && e.key === 'Enter') {
      createTag(newTag)
        .then(res => {
          setNewTag('')
          refreshNote(id)
        })
        .catch(err => {
          setTagsError(err.response.data.message)
          setTimeout(() => {
            setTagsError('')
          }, 3000)
        })
      console.log(newTag)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((savedName !== name && validInput(name)) || savedBody !== body) {
        setSaveLoader(true)
        updateNote(id, body, name).then(res => {
          setSaveLoader(false)
          setSavedBody(body)
          setSavedName(name)
        })
      }
    }, AUTOSAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [name, body])

  const editorRef = useRef(null)

  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setTagsMenu(false))

  return (
    <Layout>
      {note && <Meta title={`${note?.title} | Notely`} />}
      {noteLoading && <Loader center={true} />}
      {note && (
        <>
          <NoteToolbar
            setNote={setNote}
            body={body}
            title={name}
            savedBody={savedBody}
            savedName={savedName}
            setSavedBody={setSavedBody}
            setSavedName={setSavedName}
            saveLoader={saveLoader}
            setSaveLoader={setSaveLoader}
            note={note}
            folder={note.folder}
          />
          <div className="w-full mx-auto mt-12 md:max-w-6xl">
            <input
              type="text"
              value={name || ''}
              maxLength={64}
              className="block w-full text-4xl font-bold outline-none text-primary-default"
              onChange={e => setName(e.target.value)}
            />
            <div className="flex flex-wrap mt-3 mb-2 text-primary-dark">
              {tags?.map(noteTag => (
                <div className="flex self-center px-2 py-1 mx-2 text-sm font-medium tracking-wider text-white bg-green-700 rounded-xl">
                  <TagLabel noteTag={noteTag} refreshNote={refreshNote} />
                </div>
              ))}
              <button
                onClick={() => setTagsMenu(!tagsMenu)}
                className="py-1 px-1.5 my-2 rounded hover:bg-basic-50 text-primary-light "
              >
                <i className="mr-2 fas fa-plus"></i>
                Tags
              </button>
            </div>
            {tagsMenu && (
              <ul
                ref={menuRef}
                className="z-10 flex flex-wrap py-1 mr-3 bg-white md:w-10/12 overflow-clip shadow-custom text-primary-light"
              >
                {allTags ? (
                  allTags.map(tag => {
                    return (
                      <>
                        <TagsMenu note={note} tag={tag} setTagsError={setTagsError} refreshNote={refreshNote} />
                      </>
                    )
                  })
                ) : (
                  <p className="mx-2">No tags</p>
                )}
                <input
                  type="text"
                  className="px-2 py-0.5 mb-1 mx-2 text-sm border-2 border-gray-300 rounded-3xl focus:outline-none font-medium"
                  value={newTag || ''}
                  placeholder="Add tag"
                  onChange={e => setNewTag(e.target.value)}
                  onKeyPress={addTagHandler}
                />
                {tagsError && <Toast variant="error" message={tagsError} />}
              </ul>
            )}
            <Editor body={note.body} setBody={setBody} />
          </div>
        </>
      )}
      {error && <NotFound alt={error} />}
    </Layout>
  )
}

export default NotePage
