import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { AuthRequest } from '../auth/models/AuthRequest';
import { EditItemDto } from './dto/edit-item.dto';
import { RegisterItemEntryTransactionDto } from './dto/register-item-entry-transaction.dto';
import { RegisterItemRetirementTransactionDto } from './dto/register-item-retirement-transaction.dto';
import { RegisterItemDto } from './dto/register-item.dto';
import { StockService } from './stock.service';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // Item
  @Get('/items')
  fetchAllItems(@Query() params: PaginationParams) {
    return this.stockService.fetchAllItems(params);
  }

  @Get('/items/:id')
  findItemById(@Param('id') id: string) {
    return this.stockService.findItemById(id);
  }

  @Post('/items')
  register(@Request() req: AuthRequest, @Body() dto: RegisterItemDto) {
    const email = req.user.email;

    return this.stockService.registerItem({ createdBy: email, ...dto });
  }

  @Patch('/items/:id')
  editItem(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: EditItemDto,
  ) {
    const email = req.user.email;
    return this.stockService.editItem(id, { updatedBy: email, ...dto });
  }

  // Stock Transactions
  @Post('items/:id/transaction/entry')
  registerItemEntryTransaction(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: RegisterItemEntryTransactionDto,
  ) {
    const email = req.user.email;
    return this.stockService.registerItemEntryTransaction(id, {
      createdBy: email,
      ...dto,
    });
  }

  @Post('items/:id/transaction/output')
  registerItemRetirementTransaction(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: RegisterItemRetirementTransactionDto,
  ) {
    const email = req.user.email;
    return this.stockService.registerItemRetirementTransaction(id, {
      createdBy: email,
      ...dto,
    });
  }
}
