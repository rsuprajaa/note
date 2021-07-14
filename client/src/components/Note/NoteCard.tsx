import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { Note } from '../../types'

const NoteCard = ({ note }: { note: Note }) => {
  const history = useHistory()
  return (
    <div
      onClick={() => history.push(`/notes/${note.id}`)}
      className="flex flex-col p-4 my-1 overflow-hidden transition duration-100 ease-in-out rounded-sm cursor-pointer text-primary-default h-44 shadow-custom hover:bg-basic-20 note-page"
    >
      <div className="mb-2">
        <span className="inline-block mb-1 text-sm align-bottom text-primary-light">
          <em>Last updated on {format(new Date(note.updated_at), 'dd-MMMM')}</em>
        </span>
        <p className="mb-1 text-lg font-bold">{note.title}</p>
      </div>
      {!note.body && <em className="text-sm font-light ">Empty</em>}
      <div className="note-card" dangerouslySetInnerHTML={{ __html: note.body }}></div>
    </div>
  )
}

export default NoteCard
