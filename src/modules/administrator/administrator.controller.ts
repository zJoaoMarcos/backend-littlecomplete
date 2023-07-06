import { Body, Controller, Patch, Post, Request } from '@nestjs/common';
import { AuthRequest } from '../auth/models/AuthRequest';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('administrators')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Patch('update-password')
  updatePassword(
    @Request() req: AuthRequest,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const email = req.user.email;

    return this.administratorService.updatePassword(email, updatePasswordDto);
  }
}
