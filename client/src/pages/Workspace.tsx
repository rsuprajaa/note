import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { searchNote } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import Meta from '../components/Meta/MetaData'
import { useAuth } from '../context/UserContext'
import { Note } from '../types'

const Workspace = () => {
  const { state } = useAuth()
  const [query, setQuery] = useState<string>('')
  const [notes, setNotes] = useState<Note[]>()

  const history = useHistory()

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchNote(query)
        .then(res => {
          setNotes(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    searchNote(query)
      .then(res => {
        setNotes(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <Meta title="Workspace | Notely" />
      <div className="w-4/5 mx-auto mt-5">
        <h1 className="text-4xl font-bold text-primary-default">Workspace</h1>
        <input
          type="text"
          value={query}
          className="block w-full px-4 py-2 mt-5 mb-4 border-2 focus:outline-none rounded-3xl"
          placeholder="Search for notes. Type and press Enter to search"
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
        />
        <ul className="mt-2">
          {notes &&
            notes.map(note => (
              <li
                key={note.id}
                className="px-3 py-3 my-3 font-medium tracking-wide cursor-pointer hover:text-green-primary hover:bg-green-light rounded-3xl"
                onClick={() => history.push(`/notes/${note.id}`)}
              >
                <i className="mr-2 far fa-file-alt"></i>
                {note.title}
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Workspace
