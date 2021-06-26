import { classToPlain } from 'class-transformer'
import { BaseEntity, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export default abstract class Entity extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON() {
    return classToPlain(this)
  }
}
