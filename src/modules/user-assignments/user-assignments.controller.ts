import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';
import { UserAssignmentsService } from './user-assignments.service';

@ApiTags('User Assignments')
@Controller('user-assignments')
export class UserAssignmentsController {
  constructor(
    private readonly userAssignmentsService: UserAssignmentsService,
  ) {}

  @Post()
  create(@Body() createUserAssignmentDto: CreateUserAssignmentDto) {
    return this.userAssignmentsService.create(createUserAssignmentDto);
  }

  @Get()
  findAll() {
    return this.userAssignmentsService.findAll();
  }

  @Get('equipment/:id')
  findByEquipmentId(@Param('id') id: string) {
    return this.userAssignmentsService.findByEquipmentId(id);
  }

  @Get('user/:id')
  findByUserName(@Param('id') id: string) {
    return this.userAssignmentsService.findByUserName(id);
  }

  @Delete(':id')
  removeEquipmentAssignment(@Param('id') id: string) {
    return this.userAssignmentsService.removeEquipmentAssignment(id);
  }
}
