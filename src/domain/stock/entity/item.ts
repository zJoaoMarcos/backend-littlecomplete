import { Entity } from '@/core/entities/entity';

export interface ItemProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: string;
  category: string;
  amount: number;
  updateAt: Date;
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

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get brand() {
    return this.props.brand;
  }

  set brand(brand: string) {
    this.props.brand = brand;
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
}
