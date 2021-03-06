import { useEffect, useState } from 'react'
import { notesShared } from '../apiCalls/notes'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import NoteCard from '../components/Note/NoteCard'
import { UserRole } from '../types'

const Shared = () => {
  const [roles, setRoles] = useState<UserRole[] | void>()
  const [rolesLoading, setRolesLoading] = useState<boolean>(true)

  useEffect(() => {
    notesShared().then(res => {
      setRoles(res)
      setRolesLoading(false)
    })
  }, [])

  return (
    <Layout>
      <Meta title="Shared With Me | Notely" />
      {rolesLoading ? (
        <Loader center={true} />
      ) : (
        <div className="max-w-6xl mx-auto mt-12">
          <h1 className="text-5xl font-bold">Shared with me</h1>
          <div className="grid mx-3 mt-4 md:mx-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
            {roles && roles.length > 0 ? (
              roles.map(role => <NoteCard key={role.resource.id} note={role.resource} />)
            ) : (
              <p className="absolute mt-48 text-lg left-2/4 text-primary-default">No Notes found</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Shared
