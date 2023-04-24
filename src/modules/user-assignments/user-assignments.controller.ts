import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';
import { UserAssignmentsService } from './user-assignments.service';

@Controller('user-assignments')
export class UserAssignmentsController {
  constructor(
    private readonly userAssignmentsService: UserAssignmentsService,
  ) {}

  @Post()
  create(@Body() createUserAssignmentDto: CreateUserAssignmentDto) {
    return this.userAssignmentsService.save(createUserAssignmentDto);
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

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAssignmentDto: UpdateUserAssignmentDto,
  ) {
    return this.userAssignmentsService.update(+id, updateUserAssignmentDto);
  } */

  /*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAssignmentsService.remove(+id);
  } */
}
