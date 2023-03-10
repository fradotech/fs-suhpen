import { EttUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => EttUser)
  createdBy: IUser

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => EttUser)
  updatedBy: IUser

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => EttUser)
  deletedBy: IUser

  @BeforeInsert()
  beforeInsert(): void {
    // this.createdBy = user
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    // this.updatedBy = user
    this.updatedAt = new Date()
  }

  @BeforeSoftRemove()
  beforeSoftRemove(): void {
    // this.deletedBy = user
  }
}
