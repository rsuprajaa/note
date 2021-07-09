import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getFolder, getNotesOfFolder, updateFolder } from '../apiCalls/folder'
import { addNote } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import NoteCard from '../components/Note/NoteCard'
import FolderToolbar from '../components/Toolbar/Folder'
import { Folder, Note } from '../types'

const AUTOSAVE_INTERVAL = 1000

const FolderPage = () => {
  const [folder, setFolder] = useState<Folder | void>()
  const [notes, setNotes] = useState<Note[] | void>()
  const [folderName, setFolderName] = useState<string | void>()
  const [savedName, setSavedName] = useState<string | void>()
  const location = useLocation()
  const history = useHistory()
  const id = location.pathname.split('/')[2]

  useEffect(() => {
    getFolder(id).then(res => {
      setFolder(res)
      setFolderName(res?.name)
    })
    getNotesOfFolder(id).then(res => {
      setNotes(res)
    })
  }, [id])

  const addNoteHandler = () => {
    console.log(id)
    addNote(id).then(res => {
      history.push(`/notes/${res?.id}`)
      getNotesOfFolder(id).then(res => {
        setNotes(res)
      })
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (savedName !== folderName && folderName && folderName.trim().length > 2) {
        updateFolder(id, folderName).then(res => {})
        setSavedName(folderName)
      }
    }, AUTOSAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [folderName])

  return (
    <Layout>
      {folder && (
        <FolderToolbar
          folderName={folderName}
          setFolderName={setFolderName}
          savedName={savedName}
          setSavedName={setSavedName}
          folder={folder}
        />
      )}
      {folder && (
        <div className="max-w-6xl mx-auto mt-12">
          <input
            type="text"
            className="block w-full mb-2 text-4xl font-bold outline-none text-primary-default"
            value={folderName || ''}
            onChange={e => setFolderName(e.target.value)}
            maxLength={32}
          />
          <div className="my-1">
            <button onClick={addNoteHandler} className="py-1 px-1.5 my-2 rounded hover:bg-basic-50 text-primary-light ">
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
      )}
    </Layout>
  )
}

export default FolderPage
