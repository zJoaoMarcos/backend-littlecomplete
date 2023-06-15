import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterItemDto } from './dto/register-item.dto';
import { StockService } from './stock.service';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  register(@Body() dto: RegisterItemDto) {
    return this.stockService.register({ ...dto });
  }
}
