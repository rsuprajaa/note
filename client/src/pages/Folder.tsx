import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getFolder, getNotesOfFolder, updateFolder } from '../apiCalls/folder'
import { addNote } from '../apiCalls/notes'
import NotFound from '../components/Error/NotFound'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import NoteCard from '../components/Note/NoteCard'
import FolderToolbar from '../components/Toolbar/Folder'
import { Folder, Note } from '../types'
import { validInput } from '../utils/validation'

const AUTOSAVE_INTERVAL = 1000

const FolderPage = () => {
  const [folder, setFolder] = useState<Folder | void>()
  const [folderLoading, setFolderLoading] = useState<boolean>(true)
  const [notes, setNotes] = useState<Note[] | void>()
  const [folderName, setFolderName] = useState<string>('')
  const [savedName, setSavedName] = useState<string>('')
  const [saveLoader, setSaveLoader] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const location = useLocation()
  const history = useHistory()

  const id = location.pathname.split('/')[2]

  useEffect(() => {
    getFolder(id)
      .then(res => {
        setFolder(res)
        setError('')
      })
      .catch(err => {
        setError('Folder not found')
      })

    setFolderLoading(false)
    getNotesOfFolder(id).then(res => {
      setNotes(res)
    })
  }, [id])

  useEffect(() => {
    if (folder) {
      setFolderName(folder.name)
    }
  }, [folder, id])

  const addNoteHandler = () => {
    addNote(id).then(res => {
      history.push(`/notes/${res?.id}`)
      getNotesOfFolder(id).then(res => {
        setNotes(res)
      })
    })
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (savedName !== folderName && folderName && validInput(folderName)) {
        setSaveLoader(true)
        updateFolder(id, folderName).then(res => {
          setSaveLoader(false)
          setSavedName(folderName)
        })
      }
    }, AUTOSAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [folderName])

  return (
    <Layout>
      {folderLoading && <Loader center={true} />}
      {folder && (
        <>
          <FolderToolbar
            saveLoader={saveLoader}
            setSaveLoader={setSaveLoader}
            folderName={folderName}
            setFolderName={setFolderName}
            savedName={savedName}
            setSavedName={setSavedName}
            folder={folder}
          />
          <div className="max-w-6xl mx-auto mt-12">
            <input
              type="text"
              className="block w-full mb-2 text-4xl font-bold outline-none text-primary-default"
              value={folderName || ''}
              onChange={e => setFolderName(e.target.value)}
              maxLength={32}
            />
            <div className="my-1">
              <button
                onClick={addNoteHandler}
                className="py-1 px-1.5 my-2 rounded hover:bg-basic-50 text-primary-light "
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Note
              </button>
            </div>
            <div className="grid grid-cols-4 mx-1 gap-x-8 gap-y-2">
              {notes?.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        </>
      )}
      {error && <NotFound alt={error} />}
    </Layout>
  )
}

export default FolderPage
