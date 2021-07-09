import { Length } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './Entity'
import Note from './Note'
import User from './User'

@Entity('user_roles')
export default class UserRole extends Model {
  @Column({ default: 'member' })
  @Length(1, 255)
  permission: string

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Note, { nullable: false, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resource_id' })
  resource: Note

  constructor(userRole: Partial<UserRole>) {
    super()
    Object.assign(this, userRole)
  }
}
