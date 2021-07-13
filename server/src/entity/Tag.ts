import { Length } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import NoteTag from './Note_Tag'
import User from './User'

@Entity('tags')
export default class Tag extends Model {
  @Column()
  @Length(1, 64)
  name: string

  @OneToMany(() => NoteTag, noteTags => noteTags.note)
  note: Note[]

  // created by
  @ManyToOne(() => User, user => user.tags, { nullable: false, onDelete: 'CASCADE', eager: true })
  user: User

  constructor(tag: Partial<Tag>) {
    super()
    Object.assign(this, tag)
  }
}
