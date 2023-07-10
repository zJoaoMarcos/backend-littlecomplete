import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AuditorySchema } from './auditory.schema';
import { ItemSchema } from './item.schema';
import { StockTransactionsSchema } from './stock-transactions.schema';

@Index('administrator_email_key', ['email'], { unique: true })
@Index('administrator_pkey', ['id'], { unique: true })
@Index('administrator_username_key', ['username'], { unique: true })
@Entity('administrator', { schema: 'public' })
export class AdministratorSchema {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('character varying', { name: 'username', unique: true, length: 100 })
  username: string;

  @Column('character varying', { name: 'display_name', length: 50 })
  displayName: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @OneToMany(() => AuditorySchema, (auditory) => auditory.createdBy)
  auditories: AuditorySchema[];

  @OneToMany(() => ItemSchema, (item) => item.createdBy)
  items: ItemSchema[];

  @OneToMany(
    () => StockTransactionsSchema,
    (stockTransactions) => stockTransactions.createdBy,
  )
  stockTransactions: StockTransactionsSchema[];
}
