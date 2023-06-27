import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemSchema } from './item.schema';

@Index('stock_transactions_pkey', ['id'], { unique: true })
@Entity('stock_transactions', { schema: 'public' })
export class StockTransactionsSchema {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('character varying', { name: 'price', nullable: true, length: 30 })
  price: string | null;

  @Column('character varying', {
    name: 'requester',
    nullable: true,
    length: 50,
  })
  requester: string | null;

  @Column('character varying', { name: 'supplier', nullable: true, length: 50 })
  supplier: string | null;

  @Column('character varying', { name: 'invoice', nullable: true, length: 50 })
  invoice: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('text', { name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => ItemSchema, (item) => item.stockTransactions)
  @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
  item: ItemSchema;
}
