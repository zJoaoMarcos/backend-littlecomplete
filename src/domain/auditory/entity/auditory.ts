import { Entity } from '@/core/entities/entity';

export interface AuditoryProps {
  id: string;
  type: string;
  module: string;
  form: string;
  description: string;
  createdAt: Date;
  createdBy: string;
}

export class Auditory extends Entity<AuditoryProps> {
  static create(props: AuditoryProps) {
    const auditory = new Auditory({
      ...props,
    });

    return auditory;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.props.type = type;
  }

  get module() {
    return this.props.module;
  }

  set module(module: string) {
    this.props.module = module;
  }

  get form() {
    return this.props.form;
  }

  set form(form: string) {
    this.props.form = form;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
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
