/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '@/core/entities/entity';

interface ItemProps {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amountMin: number;
  updatedAt: Date;
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

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get type() {
    return this.props.type;
  }

  get amount() {
    return this.props.amount;
  }

  get amountMin() {
    return this.props.amountMin;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set id(id: string) {
    this.props.id = id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set type(type: string) {
    this.props.type = type;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  set amountMin(amountMin: number) {
    this.props.amountMin = amountMin;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
