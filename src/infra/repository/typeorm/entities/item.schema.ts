import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AdministratorSchema } from './administrator.schema';
import { StockTransactionsSchema } from './stock-transactions.schema';

@Index('item_pkey', ['id'], { unique: true })
@Entity('item', { schema: 'public' })
export class ItemSchema {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'category', length: 50 })
  category: string;

  @Column('character varying', { name: 'model', length: 50 })
  model: string | null;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('integer', { name: 'amount_min' })
  amountMin: number;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => AdministratorSchema, (administrator) => administrator.items)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'email' }])
  createdBy: AdministratorSchema;

  @OneToMany(
    () => StockTransactionsSchema,
    (stockTransactions) => stockTransactions.item,
  )
  stockTransactions: StockTransactionsSchema[];
}
