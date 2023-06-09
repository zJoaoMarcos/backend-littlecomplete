import { Entity } from '@/core/entities/entity';

export interface UserProps {
  user_name: string;
  complete_name: string;
  title: string;
  department: {
    id: number;
    name: string;
  };
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date;
  demission_date: Date | null;
  status: string;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps) {
    const user = new User({
      ...props,
    });

    return user;
  }

  get user_name() {
    return this.props.user_name;
  }

  set user_name(user_name: string) {
    this.props.user_name = user_name;
  }

  get complete_name() {
    return this.props.complete_name;
  }

  set complete_name(complete_name: string) {
    this.props.complete_name = complete_name;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get department_id() {
    return this.props.department.id;
  }

  set department_id(department_id: number) {
    this.props.department.id = department_id;
  }

  get department_name() {
    return this.props.department.name;
  }

  set department_name(department_name: string) {
    this.props.department.name = department_name;
  }

  get telephone() {
    return this.props.telephone;
  }

  set telephone(telephone: number) {
    this.props.telephone = telephone;
  }

  get direct_boss() {
    return this.props.direct_boss;
  }

  set direct_boss(direct_boss: string) {
    this.props.direct_boss = direct_boss;
  }

  get smtp() {
    return this.props.smtp;
  }

  set smtp(smtp: string) {
    this.props.smtp = smtp;
  }

  get admission_date() {
    return this.props.admission_date;
  }

  set admission_date(admission_date: Date) {
    this.props.admission_date = admission_date;
  }

  get demission_date() {
    return this.props.demission_date;
  }

  set demission_date(demission_date: Date) {
    this.props.demission_date = demission_date;
  }

  get status() {
    return this.props.status;
  }

  set status(status: string) {
    this.props.status = status;
  }
}
