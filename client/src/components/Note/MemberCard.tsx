import { Dispatch, SetStateAction } from 'react'
import { getNote, removePermission } from '../../apiCalls/notes'
import { Note, UserRole } from '../../types'

interface AppProps {
  role: UserRole
  setNote: Dispatch<SetStateAction<void | Note | undefined>>
}

const MemberCard = (props: AppProps) => {
  const { role, setNote } = props
  const deleteMember = () => {
    removePermission(role.resource.id, role.user.id).then(res => {
      getNote(role.resource.id).then(res => {
        setNote(res)
      })
    })
  }
  return (
    <li>
      <div className="px-2 py-1 my-2 rounded cursor-pointer shadow-custom">
        {role.permission === 'member' && (
          <button onClick={deleteMember} className="float-right text-sm text-primary-default">
            <i className="far fa-trash-alt"></i>
          </button>
        )}
        <p className={`${role.permission === 'member' ? 'font-medium' : 'font-bold'} text-primary-dark`}>
          {role.user.name}{' '}
          {role.permission === 'owner' && <span className="text-sm font-medium text-primary-light">(Author)</span>}
        </p>
        <p className="text-sm">
          <em>@{role.user.email}</em>
        </p>
      </div>
    </li>
  )
}

export default MemberCard
