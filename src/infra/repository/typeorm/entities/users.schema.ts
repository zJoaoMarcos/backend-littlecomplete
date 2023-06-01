import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DepartmentsSchema } from './departments.schema';
import { EquipmentsUserSchema } from './equipments-user.schema';

@Index('users_smtp_key', ['smtp'], { unique: true })
@Index('users_pkey', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class UsersSchema {
  @Column('character', { primary: true, name: 'username', length: 50 })
  username: string;

  @Column('character', { name: 'complete_name', nullable: true, length: 100 })
  completeName: string | null;

  @Column('character', { name: 'title', nullable: true, length: 50 })
  title: string | null;

  @Column('integer', { name: 'telephone', nullable: true })
  telephone: number | null;

  @Column('character', {
    name: 'smtp',
    nullable: true,
    unique: true,
    length: 50,
  })
  smtp: string | null;

  @Column('date', { name: 'admission_date', nullable: true })
  admissionDate: Date | null;

  @Column('date', { name: 'demission_date', nullable: true })
  demissionDate: Date | null;

  @Column('character', { name: 'status', nullable: true, length: 50 })
  status: string | null;

  @OneToMany(
    () => DepartmentsSchema,
    (departments) => departments.responsibleId,
  )
  departments: DepartmentsSchema[];

  @OneToMany(
    () => EquipmentsUserSchema,
    (equipmentsUser) => equipmentsUser.user,
  )
  equipmentsUsers: EquipmentsUserSchema[];

  @ManyToOne(() => DepartmentsSchema, (departments) => departments.users)
  @JoinColumn([{ name: 'departmentId', referencedColumnName: 'id' }])
  department: DepartmentsSchema;

  @ManyToOne(() => UsersSchema, (users) => users.users)
  @JoinColumn([{ name: 'direct_boss', referencedColumnName: 'username' }])
  directBoss: UsersSchema;

  @OneToMany(() => UsersSchema, (users) => users.directBoss)
  users: UsersSchema[];
}
