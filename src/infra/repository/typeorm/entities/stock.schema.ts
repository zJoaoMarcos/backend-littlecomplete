import { Column, Entity, Index } from 'typeorm';

@Index('stock_pkey', ['id'], { unique: true })
@Entity('stock', { schema: 'public' })
export class StockSchema {
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

  @Column('integer', { name: 'amount_min' })
  amountMin: number;
}
