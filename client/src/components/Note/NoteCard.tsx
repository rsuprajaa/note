import { useHistory } from 'react-router-dom'
import { Note } from '../../types'

const NoteCard = ({ note }: { note: Note }) => {
  const history = useHistory()
  return (
    <div
      onClick={() => history.push(`/notes/${note.id}`)}
      className="p-4 my-1 break-words transition duration-100 ease-in-out rounded-sm cursor-pointer shadow-custom hover:bg-basic-20"
    >
      <h2 className="mb-1 text-lg font-bold text-primary-default">{note.title}</h2>
      <p>{note.body ? note.body.substring(0, 50) : <em className="text-sm font-light ">Empty</em>}</p>
    </div>
  )
}

export default NoteCard
