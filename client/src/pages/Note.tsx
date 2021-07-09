import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getNote, updateNote } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import NoteToolbar from '../components/Toolbar/Note'
import { Note } from '../types'

const AUTOSAVE_INTERVAL = 1000

const NotePage = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [note, setNote] = useState<Note | void>()
  const [name, setName] = useState<string | void>('')
  const [savedName, setSavedName] = useState<string | void>('')
  const [savedBody, setSavedBody] = useState<string | void>('')
  const [body, setBody] = useState<string | void>('')
  useEffect(() => {
    getNote(id).then(res => {
      setNote(res)
      setBody(res?.body)
      setName(res?.title)
    })
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (savedName !== name || savedBody !== body) {
        updateNote(id, body, name).then(res => {})
        setSavedBody(body)
        setSavedName(name)
      }
    }, AUTOSAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [name, body])

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
            <textarea
              contentEditable="true"
              suppressContentEditableWarning={true}
              className="block w-full my-4 text-lg tracking-wide break-words outline-none resize-y"
              placeholder="Click here to start writing"
              onChange={e => setBody(e.target.value || 'helo')}
              value={body || ''}
            ></textarea>
          </div>
        </>
      )}
    </Layout>
  )
}

export default NotePage
