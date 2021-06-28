import { Length } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import Model from './Entity'
import Folder from './Folder'
import UserRole from './UserRole'

@Entity('notes')
export default class Note extends Model {
  @Column({ default: 'Untitled' })
  @Length(1, 255)
  title: string

  @Column({ nullable: true })
  @Length(1, 255)
  body: string

  @Column({ nullable: true })
  @Length(1, 255)
  priority: string

  @ManyToOne(() => Folder, folder => folder.notes, { nullable: false })
  @JoinColumn({ name: 'folder_id' })
  folder: Folder

  @OneToMany(() => UserRole, userRole => userRole.resource)
  userRole: UserRole[]

  constructor(note: Partial<Note>) {
    super()
    Object.assign(this, note)
  }
}
