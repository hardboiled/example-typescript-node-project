import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity()
export class FemaDefinition {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column()
  fieldName!: string

  @Column()
  fieldAlias!: string

  @Column()
  fieldType!: string

  @Column()
  sort!: number

  @Column()
  length!: number

  @Column()
  relevantLayer!: string

  @Column()
  metricType!: string

  @Column()
  version!: string

  @Column({ default: () => `now()` })
  createdAt!: Date

  @Column({ default: () => `now()` })
  updatedAt!: Date

  exampleMethodToTest() {
    return `${this.createdAt},${this.updatedAt}`
  }
}
