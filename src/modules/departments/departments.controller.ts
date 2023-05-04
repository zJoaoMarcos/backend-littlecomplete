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

  @Get('/id')
  findOne(@Query('id') id: string) {
    console.log(id);
    return this.departmentsService.findByName(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() cost_center: number) {
    return this.departmentsService.update(id, cost_center);
  }
}
