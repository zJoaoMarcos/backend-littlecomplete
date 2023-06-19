import { PaginationParams } from '@/core/repositories/pagination-params';
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(@Query() params: PaginationParams) {
    return this.usersService.findAll(params);
  }

  @Get('department/:id')
  findMany(@Param('id') id: number, @Query() findManyParams: PaginationParams) {
    const { skip, take } = findManyParams;
    return this.usersService.findByDepartmentId(id, skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByUserName(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    const { status } = dto;
    return this.usersService.updateStatus(id, status);
  }
}
