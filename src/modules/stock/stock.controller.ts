import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationParams } from '@/core/repositories/pagination-params';
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

  @Post('/items')
  register(@Body() dto: RegisterItemDto) {
    return this.stockService.registerItem({ ...dto });
  }

  @Get('/items')
  fetchAllItems(@Query() params: PaginationParams) {
    return this.stockService.fetchAllItems(params);
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
