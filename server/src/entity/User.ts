import bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, Length } from 'class-validator'
import { BeforeInsert, Column, Entity } from 'typeorm'
import Model from './Entity'

@Entity('users')
export default class User extends Model {
  @Column()
  @Length(1, 255)
  name: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  @Exclude()
  @Length(6, 255)
  password: string

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 6)
  }

  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }
}
