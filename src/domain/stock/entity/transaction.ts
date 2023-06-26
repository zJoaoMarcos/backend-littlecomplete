import { Entity } from '@/core/entities/entity';

export interface TransactionProps {
  id: string;
  itemId: string;
  type: string;
  amount: number;
  price: number;
  requester: string | null;
  supplier: string | null;
  invoice: string | null;
  createdBy: string;
  createdAt: Date;
}

export class Transaction extends Entity<TransactionProps> {
  static create(props: TransactionProps) {
    const transaction = new Transaction({
      ...props,
    });

    return transaction;
  }

  get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.props.type = type;
  }

  get itemId() {
    return this.props.itemId;
  }

  set itemId(itemId: string) {
    this.props.itemId = itemId;
  }

  get amount() {
    return this.props.amount;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get invoice() {
    return this.props.invoice;
  }

  set invoice(invoice: string) {
    this.props.invoice = invoice;
  }

  get requester() {
    return this.props.requester;
  }

  set requester(requester: string) {
    this.props.requester = requester;
  }

  get supplier() {
    return this.props.supplier;
  }

  set supplier(supplier: string) {
    this.props.supplier = supplier;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  set createdBy(createdBy: string) {
    this.props.createdBy = createdBy;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
}
