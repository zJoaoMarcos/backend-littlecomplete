export class CreateUserDto {
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
