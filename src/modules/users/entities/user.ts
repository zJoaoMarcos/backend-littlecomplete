export interface UserProps {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone?: number;
  direct_boss: string;
  smtp: string;
  admission_date?: Date;
  demission_date?: Date;
  status: string;
}

export class User {
  private props: UserProps;

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

  constructor(props: UserProps) {
    const { admission_date, demission_date } = props;

    if (demission_date <= admission_date) {
      throw new Error('Invalid date');
    }

    this.props = props;
  }
}
