import { RegisterItemUseCase } from '@/domain/stock/use-cases/register-item';
import { Injectable } from '@nestjs/common';
import { RegisterItemDto } from './dto/register-item.dto';

@Injectable()
export class StockService {
  constructor(private registerItemUseCase: RegisterItemUseCase) {}

  async register({ brand, model, type, category, createdBy }: RegisterItemDto) {
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
}
