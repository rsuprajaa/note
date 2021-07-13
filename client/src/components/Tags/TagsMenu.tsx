import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { addTagsToNote, deleteTag } from '../../apiCalls/tags'
import { Note, Tag } from '../../types'
import useOnClickOutside from '../../utils/useClickOutside'
import Modal from '../Alert/Modal'

const TagsMenu = ({
  tag,
  note,
  setTagsError,
  refreshNote,
}: {
  tag: Tag
  note: Note
  setTagsError: Dispatch<SetStateAction<string | void | undefined>>
  refreshNote: (id: string) => void
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [deleteAction, setDeleteAction] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const addTagHandler = () => {
    addTagsToNote(note.id, tag.id)
      .then(res => {
        refreshNote(note.id)
      })
      .catch(err => {
        setTagsError(err.response.data.message)
        setTimeout(() => {
          setTagsError('')
        }, 3000)
      })
  }
  const deleteTagHandler = () => {
    setDeleteModal(true)
  }

  useEffect(() => {
    if (deleteAction) {
      deleteTag(tag.id)
        .then(res => {
          console.log(res)
          refreshNote(note.id)
        })
        .catch(err => console.log(err))
    }
  }, [deleteAction])

  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setMenuOpen(false))

  return (
    <div
      ref={menuRef}
      key={tag.id}
      className="relative inline px-3 py-1 mx-3 my-2 text-sm font-medium tracking-wide border-2 cursor-pointer border-basic-50 rounded-2xl"
    >
      {deleteModal && (
        <Modal
          title="Are you sure you want to delete the tag?"
          actionValue={deleteAction}
          setActionValue={setDeleteAction}
          action="Delete"
          variant="error"
          body="Are you sure you want to delete the tag. This
          action cannot be undone."
          setModal={setDeleteModal}
        />
      )}
      <span className="mr-4" onClick={addTagHandler}>
        {tag.name}
      </span>
      <span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="px-1 rounded hover:bg-basic-50">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </span>
      {menuOpen && (
        <p className="absolute z-10 py-1 overflow-hidden text-center -translate-x-1/2 -translate-y-1/2 bg-white min-w-max left-3/4 top-3/4 shadow-custom">
          <li className="px-2 py-1.5 text-sm hover:bg-basic-50" onClick={deleteTagHandler}>
            Delete{' '}
            <span className="px-2 whitespace-nowrap text-white bg-green-700 rounded-xl py-0.5 tracking-wide">
              {tag.name}
            </span>
          </li>
        </p>
      )}
    </div>
  )
}

export default TagsMenu
