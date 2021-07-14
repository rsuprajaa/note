import { Dispatch, SetStateAction } from 'react'
import { filterByTags } from '../../apiCalls/tags'
import { Folder, Note, Tag } from '../../types'

const TagsToolbarMenu = ({
  tag,
  folder,
  setNotes,
}: {
  tag: Tag
  folder: Folder
  setNotes: Dispatch<SetStateAction<void | Note[] | undefined>>
}) => {
  const queryByTag = () => {
    filterByTags(folder.id, tag.id)
      .then(res => {
        setNotes(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <span
      key={tag.id}
      onClick={queryByTag}
      className={'px-3 my-1 font-medium text-green-800 cursor-pointer hover:bg-basic-50'}
    >
      #{'  '}
      {tag.name}
    </span>
  )
}

export default TagsToolbarMenu
