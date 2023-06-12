import { Entity } from '@/core/entities/entity';

export interface ItemProps {
  id: string;
  name: string;
  category: string;
  description: string;
  amount: number;
  amountMin: number;
  updateAt: Date;
  createdAt: Date;
}

export class Item extends Entity<ItemProps> {
  static create(props: ItemProps) {
    const item = new Item({
      ...props,
    });

    return item;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get category() {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
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
