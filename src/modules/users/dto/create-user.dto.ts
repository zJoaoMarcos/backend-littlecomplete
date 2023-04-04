export class CreateUserDto {
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
