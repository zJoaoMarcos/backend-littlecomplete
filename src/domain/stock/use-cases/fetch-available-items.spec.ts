import { InMemoryStockRepository } from '@/infra/repository/in-memory/in-memory-stock-repository';
import { MakeStock } from './factories/make-stock';
import { FetchAvailableItemsUseCase } from './fetch-available-items';

let stockRepository: InMemoryStockRepository;
let sut: FetchAvailableItemsUseCase;

describe('Fetch Available Items Use Case', () => {
  beforeEach(() => {
    stockRepository = new InMemoryStockRepository();
    sut = new FetchAvailableItemsUseCase(stockRepository);
  });

  it('should be able list all  items groub by type', async () => {
    stockRepository.items.push(
      MakeStock(),
      MakeStock(),
      MakeStock(),
      MakeStock(),
    );

    const { items } = await sut.execute();

    console.log(items);

    expect(items[0].amount).toBeGreaterThanOrEqual(items[0].amountMin);
  });
});
