import { Entity } from '@/core/entities/entity';

export interface ItemProps {
  id: string;
  category: string;
  type: string;
  model: string;
  amount: number;
  amountMin: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
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

  get model() {
    return this.props.model;
  }

  set model(model: string) {
    this.props.model = model;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.props.type = type;
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

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  set createdBy(createdBy: string) {
    this.props.createdBy = createdBy;
  }
}
