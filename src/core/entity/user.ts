export class User {
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

  constructor(
    user_name: string,
    complete_name: string,
    title: string,
    department_id: string,
    telephone: number | null,
    direct_boss: string,
    smtp: string,
    admission_date: string,
    demission_date: string | null,
    status: string,
  ) {
    this.user_name = user_name;
    this.complete_name = complete_name;
    this.title = title;
    this.department_id = department_id;
    this.telephone = telephone;
    this.direct_boss = direct_boss;
    this.smtp = smtp;
    this.admission_date = admission_date;
    this.demission_date = demission_date;
    this.status = status;
  }

  changeTitle(title: string): void {
    this.title = title;
  }

  changeDepartment(department: string): void {
    this.department_id = department;
  }

  assignTelephone(telephone: number): void {
    this.telephone = telephone;
  }
}
