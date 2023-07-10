import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdministratorSchema } from './administrator.schema';
import { ItemSchema } from './item.schema';
import { UsersSchema } from './users.schema';

@Entity('stock_transactions', { schema: 'public' })
export class StockTransactionsSchema {
  @Column('uuid', { name: 'id', default: () => 'uuid_generate_v4()' })
  id: string;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('character varying', { name: 'price', nullable: true, length: 30 })
  price: string | null;

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

  @ManyToOne(() => ItemSchema, (item) => item.stockTransactions)
  @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
  item: ItemSchema;

  @ManyToOne(() => UsersSchema, (users) => users.stockTransactions)
  @JoinColumn([{ name: 'requester', referencedColumnName: 'username' }])
  requester: UsersSchema;

  @ManyToOne(
    () => AdministratorSchema,
    (administrator) => administrator.stockTransactions,
  )
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'email' }])
  createdBy: AdministratorSchema;
}
