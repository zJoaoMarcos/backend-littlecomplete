/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '../../core/entities/entity';

interface UserProps {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: string;
  demission_date: string | null;
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

  get complete_name() {
    return this.props.complete_name;
  }

  get title() {
    return this.props.title;
  }

  get department_id() {
    return this.props.department_id;
  }

  get telephone() {
    return this.props.telephone;
  }

  get direct_boss() {
    return this.props.direct_boss;
  }

  get smtp() {
    return this.props.smtp;
  }

  get admission_date() {
    return this.props.admission_date;
  }

  get demission_date() {
    return this.props.demission_date;
  }

  get status() {
    return this.props.status;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set department_id(department: string) {
    this.props.department_id = department;
  }

  set telephone(telephone: number) {
    this.props.telephone = telephone;
  }
}
