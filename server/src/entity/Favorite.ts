import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import User from './User'

@Entity('favorites')
export default class Favorite extends Model {
  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Note, { nullable: false })
  @JoinColumn({ name: 'note_id' })
  note: Note

  constructor(favorite: Partial<Favorite>) {
    super()
    Object.assign(this, favorite)
  }
}
