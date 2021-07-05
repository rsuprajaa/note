import bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, Length } from 'class-validator'
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm'
import Model from './Entity'
import Favorite from './Favorite'
import Folder from './Folder'
import Tag from './Tag'
import UserRole from './UserRole'

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

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[]

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRole: UserRole[]

  @OneToMany(() => Favorite, favorites => favorites.user)
  favorites: Favorite[]

  @OneToMany(() => Tag, tag => tag.user)
  tags: Tag[]

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 6)
  }

  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }
}
