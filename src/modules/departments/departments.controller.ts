import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsRepository } from './repositories/departments-repository';
import { CreateDepartmentUseCase } from './use-cases/create';
import { FindAllDepartmentsUseCase } from './use-cases/find-all';
import { FindByNameDepartmentUseCase } from './use-cases/find-by-name';

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
      const findAllDepartments = new FindAllDepartmentsUseCase(
        this.departmentsRepository,
      );

      return findAllDepartments.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const findByNameDepartment = new FindByNameDepartmentUseCase(
        this.departmentsRepository,
      );

      return findByNameDepartment.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
