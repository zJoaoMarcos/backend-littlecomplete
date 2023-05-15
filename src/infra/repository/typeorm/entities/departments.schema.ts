import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipmentsSchema } from './equipments.schema';
import { UsersSchema } from './users.schema';

@Index('departments_pkey', ['id'], { unique: true })
@Index('departments_name_key', ['name'], { unique: true })
@Entity('departments', { schema: 'public' })
export class DepartmentsSchema {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character', {
    name: 'name',
    nullable: true,
    unique: true,
    length: 50,
  })
  name: string | null;

  @Column('integer', { name: 'cost_center', nullable: true })
  costCenter: number | null;

  @Column('boolean', { name: 'is_board', nullable: true })
  isBoard: boolean | null;

  @Column('character', { name: 'board', nullable: true, length: 50 })
  board: string | null;

  @ManyToOne(() => UsersSchema, (users) => users.departments)
  @JoinColumn([{ name: 'responsible_id', referencedColumnName: 'username' }])
  responsibleId: UsersSchema;

  @OneToMany(() => EquipmentsSchema, (equipments) => equipments.department)
  equipments: EquipmentsSchema[];

  @OneToMany(() => UsersSchema, (users) => users.department)
  users: UsersSchema[];
}
