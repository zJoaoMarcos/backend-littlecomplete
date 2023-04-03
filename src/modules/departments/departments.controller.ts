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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsRepository } from './repositories/departments-repository';
import { CreateDepartmentUseCase } from './use-cases/create';
import { DepartmentAlreadyExistsError } from './use-cases/errors/department-already-exits-error';
import { FindAllDepartmentUseCase } from './use-cases/findAll';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  @Post()
  create(
    @Body() body: CreateDepartmentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const createDepartmentUseCase = new CreateDepartmentUseCase(
        this.departmentsRepository,
      );

      return createDepartmentUseCase.execute(body);
    } catch (err) {
      if (err instanceof DepartmentAlreadyExistsError) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    const findAllDepartmentUseCase = new FindAllDepartmentUseCase(
      this.departmentsRepository,
    );

    return findAllDepartmentUseCase.execute();
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
