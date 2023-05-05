import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  name: string;

  cost_center: number;

  is_board: boolean;

  board: string;

  responsible_id: string;
}
