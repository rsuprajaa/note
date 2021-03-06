import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import Tag from './Tag'

@Entity('note_tags')
export default class NoteTag extends Model {
  @ManyToOne(() => Tag, { nullable: false, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag

  @ManyToOne(() => Note, note => note.noteTag, { nullable: false, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  note: Note

  constructor(noteTag: Partial<NoteTag>) {
    super()
    Object.assign(this, noteTag)
  }
}
