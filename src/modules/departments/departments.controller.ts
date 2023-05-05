import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FindAllDepartmentsOptions } from './dto/find-all-departments-options.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Query() findAllOptions: FindAllDepartmentsOptions) {
    const { skip, take } = findAllOptions;
    return this.departmentsService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const { name, cost_center, is_board, board, responsible_id } =
      updateDepartmentDto;
    return this.departmentsService.update(
      id,
      name,
      cost_center,
      is_board,
      board,
      responsible_id,
    );
  }
}
