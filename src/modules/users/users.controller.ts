import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignTelephoneDto } from './dto/assign-telephone.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserTitleDto } from './dto/update-user-title.dto';
import { UpdateUserDepartmentDto } from './dto/updateUserDepartmentDto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByUserName(id);
  }

  @Patch('department/:id')
  updateDepartment(
    @Param('id') id: string,
    @Body() updateUserDepartmentDto: UpdateUserDepartmentDto,
  ) {
    const { department } = updateUserDepartmentDto;
    return this.usersService.updateDepartment(id, department);
  }

  @Patch('title/:id')
  updateTitle(
    @Param('id') id: string,
    @Body() updateUserTitleDto: UpdateUserTitleDto,
  ) {
    const { title } = updateUserTitleDto;
    return this.usersService.updateTitle(id, title);
  }

  @Patch('telephone/:id')
  assingTelephone(
    @Param('id') id: string,
    @Body() assignTelephoneDto: AssignTelephoneDto,
  ) {
    const { telephone } = assignTelephoneDto;
    return this.usersService.assignTelephone(id, telephone);
  }
}
