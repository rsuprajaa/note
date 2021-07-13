import { removeTagFromNote } from '../../apiCalls/tags'
import { NoteTag } from '../../types'

const TagLabel = ({ noteTag, refreshNote }: { noteTag: NoteTag; refreshNote: (id: string) => void }) => {
  const deleteTagHandler = () => {
    removeTagFromNote(noteTag.note.id, noteTag.tag.id)
      .then(res => {
        console.log(res)
        refreshNote(noteTag.note.id)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <p className="px-1 mr-4">{noteTag.tag.name}</p>
      <button>
        <i className="fas fa-times" onClick={deleteTagHandler}></i>
      </button>
    </>
  )
}

export default TagLabel
