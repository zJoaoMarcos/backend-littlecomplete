import { Column, Entity, Index, OneToMany } from 'typeorm';
import { StockTransactionsSchema } from './stock-transactions.schema';

@Index('item_pkey', ['id'], { unique: true })
@Entity('item', { schema: 'public' })
export class ItemSchema {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'brand', length: 50 })
  brand: string;

  @Column('character varying', { name: 'model', length: 50 })
  model: string;

  @Column('character varying', { name: 'category', length: 50 })
  category: string;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('character varying', { name: 'created_by', length: 200 })
  createdBy: string;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => StockTransactionsSchema,
    (stockTransactions) => stockTransactions.item,
  )
  stockTransactions: StockTransactionsSchema[];
}
