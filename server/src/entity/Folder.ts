import { Length } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './Entity'
import User from './User'

@Entity('folders')
export default class Folder extends Model {
  @Column({ default: 'Untitled' })
  @Length(1, 255)
  name: string

  @ManyToOne(() => User, user => user.folders, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  constructor(folder: Partial<Folder>) {
    super()
    Object.assign(this, folder)
  }
}
