import { Entity } from '@/core/entities/entity';

export interface StockProps {
  id: string;
  itemType: string;
  amount: number;
  amountMin: number;
}

export class Stock extends Entity<StockProps> {
  static create(props: StockProps) {
    const stock = new Stock({
      ...props,
    });

    return stock;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get itemType() {
    return this.props.itemType;
  }

  set itemType(itemType: string) {
    this.props.itemType = itemType;
  }

  get amount() {
    return this.props.amount;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  get amountMin() {
    return this.props.amountMin;
  }

  set amountMin(amountMin: number) {
    this.props.amountMin = amountMin;
  }
}
