export class UpdateUserDto {
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
  status: string | null;
}
