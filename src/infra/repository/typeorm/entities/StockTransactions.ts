import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Stock } from './Stock';

@Index('stock_transactions_pkey', ['id'], { unique: true })
@Entity('stock_transactions', { schema: 'public' })
export class StockTransactions {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('character varying', { name: 'partner', length: 100 })
  partner: string;

  @Column('character varying', {
    name: 'department',
    nullable: true,
    length: 100,
  })
  department: string | null;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('text', { name: 'created_by' })
  createdBy: string;

  @Column('character varying', { name: 'value', nullable: true, length: 30 })
  value: string | null;

  @ManyToOne(() => Stock, (stock) => stock.stockTransactions)
  @JoinColumn([{ name: 'stock_id', referencedColumnName: 'id' }])
  stock: Stock;
}
