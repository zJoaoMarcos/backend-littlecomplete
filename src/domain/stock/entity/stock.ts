import { Entity } from '@/core/entities/entity';
import { Item } from './item';

interface StockProps {
  id: string;
  item: Item;
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

  get item() {
    return this.props.item;
  }

  set item(item: Item) {
    this.props.item = item;
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
