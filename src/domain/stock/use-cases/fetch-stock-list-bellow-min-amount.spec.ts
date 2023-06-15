import { InMemoryStockRepository } from '@/infra/repository/in-memory/in-memory-stock-repository';
import { MakeStock } from './factories/make-stock';
import { FetchStockListBellowMinAmountUseCase } from './fetch-stock-list-bellow-min-amount';

let stockRepository: InMemoryStockRepository;
let sut: FetchStockListBellowMinAmountUseCase;

describe('Fetch Items Bellow Minimum Amount Use Case', () => {
  beforeEach(() => {
    stockRepository = new InMemoryStockRepository();
    sut = new FetchStockListBellowMinAmountUseCase(stockRepository);
  });

  it('Should be able list all items with amount less than amount min', async () => {
    stockRepository.items.push(
      MakeStock({ amount: 20, amountMin: 2 }),
      MakeStock({ amount: 10, amountMin: 12 }),
      MakeStock({ amount: 20, amountMin: 26 }),
      MakeStock({ amount: 50, amountMin: 20 }),
    );

    const { items, totalCount } = await sut.execute();

    expect(items[0].amount).toBeLessThanOrEqual(items[0].amountMin);
    expect(totalCount).toEqual(2);
  });
});
