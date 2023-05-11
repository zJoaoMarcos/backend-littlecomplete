import { Column, Entity, Index, OneToMany } from "typeorm";
import { StockTransactions } from "./StockTransactions";

@Index("stock_pkey", ["id"], { unique: true })
@Entity("stock", { schema: "public" })
export class Stock {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "type", length: 50 })
  type: string;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("integer", { name: "amount_min" })
  amountMin: number;

  @Column("character varying", { name: "local", length: 100 })
  local: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("character varying", { name: "created_by", length: 200 })
  createdBy: string;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => StockTransactions,
    (stockTransactions) => stockTransactions.stock
  )
  stockTransactions: StockTransactions[];
}
