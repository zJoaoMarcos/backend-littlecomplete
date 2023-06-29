import { Body, Controller, Post } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@Controller('administrators')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  /* @Get(':id')
  findByEmail(@Param('id') id: string) {
    return this.administratorService.findByEmail(id);
  } */
}
