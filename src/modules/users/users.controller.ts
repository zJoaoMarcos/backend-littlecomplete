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
import { AssignTelephoneDto } from './dto/assign-telephone.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersOptionsDto } from './dto/find-all-users-options.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserTitleDto } from './dto/update-user-title.dto';
import { UpdateUserDepartmentDto } from './dto/updateUserDepartmentDto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() findAllUsersOptionsDto: FindAllUsersOptionsDto) {
    const { skip, take, where } = findAllUsersOptionsDto;

    return this.usersService.findAll(skip, take, where);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserAssignments(id);
  }

  @Patch('department/:id')
  updateDepartment(
    @Param('id') id: string,
    @Body() updateUserDepartmentDto: UpdateUserDepartmentDto,
  ) {
    const { department_id, direct_boss, title } = updateUserDepartmentDto;
    return this.usersService.updateDepartment(
      id,
      department_id,
      title,
      direct_boss,
    );
  }

  @Patch('status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    const { status } = updateUserStatusDto;
    return this.usersService.updateStatus(id, status);
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
