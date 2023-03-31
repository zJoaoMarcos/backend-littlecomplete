import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDepartmentBody } from 'src/dtos/create-equipment-body';
import { DepartmentsRepository } from 'src/repositories/equipments-repository';
import { CreateDepartmentUseCase } from 'src/use-cases/department/create';
import { FindAllDepartmentUseCase } from 'src/use-cases/department/findAll';

@Controller('department')
export class DepartmentsController {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  @Get()
  async find() {
    const findAllDepartmentUseCase = new FindAllDepartmentUseCase(
      this.departmentsRepository,
    );

    return findAllDepartmentUseCase.execute();
  }

  @Post()
  async register(@Body() body: CreateDepartmentBody) {
    const { department, cost_center, board, is_board } = body;

    const createDepartmentUseCase = new CreateDepartmentUseCase(
      this.departmentsRepository,
    );

    return createDepartmentUseCase.execute({
      department,
      cost_center,
      board,
      is_board,
    });
  }
}
