import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cost_center: number;

  @ApiProperty()
  is_board: boolean;

  @ApiProperty()
  board: string;
}
