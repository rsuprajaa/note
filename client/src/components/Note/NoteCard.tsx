import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { Note } from '../../types'

const NoteCard = ({ note }: { note: Note }) => {
  const history = useHistory()
  return (
    <div
      onClick={() => history.push(`/notes/${note.id}`)}
      className="object-cover p-4 my-1 overflow-hidden whitespace-pre-line transition duration-100 ease-in-out rounded-sm cursor-pointer text-primary-default h-44 shadow-custom hover:bg-basic-20 note-page"
    >
      <span className="float-right mt-1 text-sm text-primary-light">
        <em>Last updated on {format(new Date(note.updatedAt), 'dd-MMMM')}</em>
      </span>
      <p className="mb-1 text-lg font-bold">{note.title}</p>
      {!note.body && <em className="text-sm font-light ">Empty</em>}
      <div className="note-card" dangerouslySetInnerHTML={{ __html: note.body }}></div>
    </div>
  )
}

export default NoteCard
