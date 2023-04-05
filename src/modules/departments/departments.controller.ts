import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsRepository } from './repositories/departments-repository';
import { CreateDepartmentUseCase } from './use-cases/create-departments';
import { FindAllDepartmentsUseCase } from './use-cases/find-all-departments';
import { FindByNameDepartmentUseCase } from './use-cases/find-department-by-name';
import { UpdateDepartmentUseCase } from './use-cases/update-department';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  @Post()
  create(@Body() body: CreateDepartmentDto) {
    try {
      const createDepartmentUseCase = new CreateDepartmentUseCase(
        this.departmentsRepository,
      );

      return createDepartmentUseCase.execute(body);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  @Get()
  findAll() {
    try {
      const findAllDepartmentsUseCase = new FindAllDepartmentsUseCase(
        this.departmentsRepository,
      );

      return findAllDepartmentsUseCase.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const findByNameDepartmentUseCase = new FindByNameDepartmentUseCase(
        this.departmentsRepository,
      );

      return findByNameDepartmentUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  update(@Param('id') name: string, @Body() data: UpdateDepartmentDto) {
    try {
      const updateDepartmentUseCase = new UpdateDepartmentUseCase(
        this.departmentsRepository,
      );
      return updateDepartmentUseCase.execute(name, data);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
