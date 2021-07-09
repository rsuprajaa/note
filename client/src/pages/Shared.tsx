import { useEffect, useState } from 'react'
import { notesShared } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import NoteCard from '../components/Note/NoteCard'
import { UserRole } from '../types'

const Shared = () => {
  const [roles, setRoles] = useState<UserRole[] | void>()

  useEffect(() => {
    notesShared().then(res => {
      setRoles(res)
    })
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-5xl font-bold">Shared with me</h1>
        <div className="grid grid-cols-4 mx-1 mt-4 gap-x-8 gap-y-2">
          {roles?.map(role => (
            <NoteCard key={role.resource.id} note={role.resource} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Shared
