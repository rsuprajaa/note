import { useEffect, useState } from 'react'
import { getFavorites } from '../apiCalls/favorites'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import Meta from '../components/Meta/MetaData'
import NoteCard from '../components/Note/NoteCard'
import { Favorite } from '../types'

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[] | void>()
  const [favoritesLoading, setFavoritesLoading] = useState<boolean>(true)

  useEffect(() => {
    getFavorites()
      .then(res => {
        setFavorites(res)
        setFavoritesLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <Meta title="Favorites | Notely" />
      {favoritesLoading ? (
        <Loader center={true} />
      ) : (
        <div className="max-w-6xl mx-auto mt-12">
          <h1 className="text-5xl font-bold">Favorites</h1>
          <div className="grid mx-3 mt-4 md:mx-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
            {favorites && favorites.length > 0 ? (
              favorites.map(favorite => favorite && <NoteCard key={favorite.id} note={favorite.note} />)
            ) : (
              <p className="absolute mt-48 text-lg left-2/4 text-primary-default">No Notes found</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Favorites
