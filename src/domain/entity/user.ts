/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '../../core/entities/entity';

interface UserProps {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
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

  set complete_name(complete_name: string) {
    this.props.complete_name = complete_name;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set department_id(department_id: number) {
    this.props.department_id = department_id;
  }

  set telephone(telephone: number) {
    this.props.telephone = telephone;
  }

  set direct_boss(direct_boss: string) {
    this.props.direct_boss = direct_boss;
  }

  set smtp(smtp: string) {
    this.props.smtp = smtp;
  }

  set admission_date(admission_date: Date) {
    this.props.admission_date = admission_date;
  }

  set demission_date(demission_date: Date) {
    this.props.demission_date = demission_date;
  }

  set status(status: string) {
    this.props.status = status;
  }
}
