import { Injectable } from '@nestjs/common';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { EditItemUseCase } from '@/domain/stock/use-cases/edit-item';
import { FetchAllItemsUseCase } from '@/domain/stock/use-cases/fetch-all-items';
import { FetchStockListUseCase } from '@/domain/stock/use-cases/fetch-stock-list';
import { RegisterItemUseCase } from '@/domain/stock/use-cases/register-item';
import { RegisterItemRetirementTransactionUseCase } from '@/domain/stock/use-cases/register-item-retirement-transaction';
import { RegisterNewItemEntryTransactionUseCase } from '@/domain/stock/use-cases/register-new-item-entry-transaction';
import { EditItemDto } from './dto/edit-item.dto';
import { RegisterItemEntryTransactionDto } from './dto/register-item-entry-transaction.dto';
import { RegisterItemRetirementTransactionDto } from './dto/register-item-retirement-transaction.dto';
import { RegisterItemDto } from './dto/register-item.dto';

@Injectable()
export class StockService {
  constructor(
    private registerItemUseCase: RegisterItemUseCase,
    private editItemUseCase: EditItemUseCase,
    private fetchAllItemsUseCase: FetchAllItemsUseCase,
    private fetchStockListUseCase: FetchStockListUseCase,
    private registerItemRetirementTransactionUseCase: RegisterItemRetirementTransactionUseCase,
    private registerNewItemEntryTransactionUseCase: RegisterNewItemEntryTransactionUseCase,
  ) {}

  // Item

  async registerItem({
    brand,
    model,
    type,
    category,
    createdBy,
  }: RegisterItemDto) {
    try {
      const { item } = await this.registerItemUseCase.execute({
        brand,
        model,
        type,
        category,
        createdBy,
      });

      return item.props;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editItem(id: string, { brand, category, model, type }: EditItemDto) {
    try {
      const { item } = await this.editItemUseCase.execute({
        id,
        brand,
        category,
        model,
        type,
      });

      return item.props;
    } catch (error) {
      console.log(error); //TODO: add error handling
    }
  }

  async fetchAllItems(params: PaginationParams) {
    try {
      const { items, totalCount } = await this.fetchAllItemsUseCase.execute({
        params,
      });

      return {
        items: items.map((item) => {
          return item.props;
        }),
        totalCount,
      };
    } catch (error) {
      console.log(error); //TODO: add error handling
    }
  }

  // Stock

  async fetchStockList(params: PaginationParams) {
    try {
      const { items, totalCount } = await this.fetchStockListUseCase.execute();

      return {
        items: items.map((item) => {
          return item.props;
        }),
        totalCount,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // Stock Transactions

  async registerItemEntryTransaction(
    itemId: string,
    { price, amount, supplier, nf, createdBy }: RegisterItemEntryTransactionDto,
  ) {
    try {
      const { transaction } =
        await this.registerNewItemEntryTransactionUseCase.execute({
          itemId,
          price,
          amount,
          supplier,
          nf,
          createdBy,
        });

      return transaction.props;
    } catch (error) {
      console.log(error); //TODO: add error handling
    }
  }

  async registerItemRetirementTransaction(
    itemId: string,
    { amount, requester, createdBy }: RegisterItemRetirementTransactionDto,
  ) {
    try {
      const { transaction } =
        await this.registerItemRetirementTransactionUseCase.execute({
          itemId,
          amount,
          requester,
          createdBy,
        });

      return transaction.props;
    } catch (error) {
      console.log(error); //TODO: add error handling
    }
  }
}
