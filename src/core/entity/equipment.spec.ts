import { Equipment } from './equipment';

describe('Equipment', () => {
  it('should be able create an Equipment', () => {
    const equipment = new Equipment(
      '01-005-00434',
      'Dell',
      'T31P',
      'TI',
      'activate',
      '16GB',
      2,
      240,
      'SSD',
    );

    expect(equipment).toBeInstanceOf(Equipment);
  });
});
