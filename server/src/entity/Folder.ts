import { Length } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import User from './User'

@Entity('folders')
export default class Folder extends Model {
  @Column({ default: 'Untitled' })
  @Length(1, 255)
  name: string

  @ManyToOne(() => User, user => user.folders, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Note, note => note.folder)
  notes: Note[]

  constructor(folder: Partial<Folder>) {
    super()
    Object.assign(this, folder)
  }
}
