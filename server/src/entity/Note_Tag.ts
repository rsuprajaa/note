import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import Tag from './Tag'

@Entity('note_tags')
export default class NoteTag extends Model {
  @ManyToOne(() => Tag, { nullable: false })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag

  @ManyToOne(() => Note, { nullable: false, eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note

  constructor(noteTag: Partial<NoteTag>) {
    super()
    Object.assign(this, noteTag)
  }
}
