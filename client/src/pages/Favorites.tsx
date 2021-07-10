import { useEffect, useState } from 'react'
import { getFavorites } from '../apiCalls/favorites'
import Layout from '../components/Layout/Layout'
import NoteCard from '../components/Note/NoteCard'
import { Favorite } from '../types'

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[] | void>()

  useEffect(() => {
    getFavorites()
      .then(res => {
        setFavorites(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-5xl font-bold">Favorites</h1>
        <div className="grid grid-cols-4 mx-1 mt-4 gap-x-8 gap-y-2">
          {favorites?.map(favorite => favorite && <NoteCard key={favorite.id} note={favorite.note} />)}
        </div>
      </div>
    </Layout>
  )
}

export default Favorites
