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

import { PaginationParams } from '@/core/repositories/pagination-params';
import { EditItemDto } from './dto/edit-item.dto';
import { RegisterItemEntryTransactionDto } from './dto/register-item-entry-transaction.dto';
import { RegisterItemRetirementTransactionDto } from './dto/register-item-retirement-transaction.dto';
import { RegisterItemDto } from './dto/register-item.dto';
import { StockService } from './stock.service';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // Stock
  @Get()
  fetchStockList(@Query() params: PaginationParams) {
    return this.stockService.fetchStockList(params);
  }

  // Items
  @Get('/items')
  fetchAllItems(@Query() params: PaginationParams) {
    return this.stockService.fetchAllItems(params);
  }

  @Post('/items')
  register(@Body() dto: RegisterItemDto) {
    return this.stockService.registerItem({ ...dto });
  }

  @Patch('/items/:id')
  editItem(@Param() id: string, @Body() dto: EditItemDto) {
    return this.stockService.editItem(id, { ...dto });
  }

  // Stock Transactions
  @Post('items/:id/transaction/entry')
  registerItemEntryTransaction(
    @Param() id: string,
    @Body() dto: RegisterItemEntryTransactionDto,
  ) {
    return this.stockService.registerItemEntryTransaction(id, { ...dto });
  }

  @Post('items/:id/transaction/output')
  registerItemRetirementTransaction(
    @Param() id: string,
    @Body() dto: RegisterItemRetirementTransactionDto,
  ) {
    return this.stockService.registerItemRetirementTransaction(id, { ...dto });
  }
}
