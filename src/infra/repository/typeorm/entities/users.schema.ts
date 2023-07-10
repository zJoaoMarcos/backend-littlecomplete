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
import { StockTransactionsSchema } from './stock-transactions.schema';

@Index('unique_direct_boss', ['completeName'], { unique: true })
@Index('users_smtp_key', ['smtp'], { unique: true })
@Index('users_pkey', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class UsersSchema {
  @Column('character', { primary: true, name: 'username', length: 50 })
  username: string;

  @Column('character', { name: 'complete_name', unique: true, length: 100 })
  completeName: string;

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
  admissionDate: string | null;

  @Column('date', { name: 'demission_date', nullable: true })
  demissionDate: string | null;

  @Column('character', { name: 'status', nullable: true, length: 50 })
  status: string | null;

  @OneToMany(
    () => EquipmentsUserSchema,
    (equipmentsUser) => equipmentsUser.user,
  )
  equipmentsUsers: EquipmentsUserSchema[];

  @OneToMany(
    () => StockTransactionsSchema,
    (stockTransactions) => stockTransactions.requester,
  )
  stockTransactions: StockTransactionsSchema[];

  @ManyToOne(() => DepartmentsSchema, (departments) => departments.users)
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'id' }])
  department: DepartmentsSchema;

  @ManyToOne(() => UsersSchema, (users) => users.users)
  @JoinColumn([{ name: 'direct_boss', referencedColumnName: 'username' }])
  directBoss: UsersSchema;

  @OneToMany(() => UsersSchema, (users) => users.directBoss)
  users: UsersSchema[];
}
