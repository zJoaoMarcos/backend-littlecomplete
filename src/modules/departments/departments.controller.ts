import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsRepository } from './repositories/departments-repository';
import { CreateDepartmentUseCase } from './use-cases/create';
import { DepartmentAlreadyExistsError } from './use-cases/errors/department-already-exits-error';

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
      if (err instanceof DepartmentAlreadyExistsError) {
        throw new ConflictException(err.message);
      }

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
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
