/* eslint-disable camelcase */
import { classToPlain } from 'class-transformer'
import { BaseEntity, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export default abstract class Entity extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  toJSON() {
    return classToPlain(this)
  }
}
