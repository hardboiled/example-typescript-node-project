import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class HarzardRisk {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  oid!: number

  @Column()
  nriID!: string

  @Column()
  state!: string

  @Column()
  stateAbbr!: string

  @Column()
  stateFips!: number

  @Column()
  county!: string

  @Column()
  countyFips!: number

  @Column({ type: 'double' })
  rfldRisks!: number

  @Column({ default: () => `now()` })
  createdAt!: Date

  @Column({ default: () => `now()` })
  updatedAt!: Date
}
