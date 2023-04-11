import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  /* @Get(':id')
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
  } */
}
