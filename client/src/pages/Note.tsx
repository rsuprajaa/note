import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getNote, updateNote } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import Editor from '../components/TextEditor/CKEditor'
import NoteToolbar from '../components/Toolbar/Note'
import { Note } from '../types'
import { validInput } from '../utils/validation'

const AUTOSAVE_INTERVAL = 1000

const NotePage = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [note, setNote] = useState<Note | void>()
  const [name, setName] = useState<string>('')
  const [savedName, setSavedName] = useState<string>('')
  const [savedBody, setSavedBody] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [saveLoader, setSaveLoader] = useState<boolean>(false)

  useEffect(() => {
    getNote(id).then(res => {
      setNote(res)
    })
  }, [id])

  useEffect(() => {
    if (note) {
      setBody(note.body)
      setName(note.title)
    }
  }, [note])

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

  const content = '# hello'
  return (
    <Layout>
      {note && (
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
      )}
      {note && (
        <>
          <div className="max-w-6xl mx-auto mt-12">
            <input
              type="text"
              value={name || ''}
              maxLength={64}
              className="block w-full text-4xl font-bold outline-none text-primary-default"
              onChange={e => setName(e.target.value)}
            />
            <Editor body={body} setBody={setBody} />
          </div>
        </>
      )}
    </Layout>
  )
}

export default NotePage
