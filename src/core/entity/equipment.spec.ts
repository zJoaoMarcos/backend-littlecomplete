import { Equipment } from './equipment';

describe('Equipment', () => {
  it('should be able create an Desktop or Notebook', () => {
    const computer = new Equipment({
      id: '01-001-00434',
      cpu: 'Core i9',
      ram: '16GB',
      slots: 2,
      storage0_syze: 240,
      storage0_type: 'SSD',
      brand: 'Dell',
      department: 'TI',
      model: 'T31P',
      status: 'activate',
    });

    expect(computer).toBeInstanceOf(Equipment);
  });

  it('should not be able create an Desktop or Notebook missing attributes ', () => {
    expect(() => {
      new Equipment({
        id: '01-001-00434',
        ram: '16GB',
        slots: 2,
        storage0_syze: 240,
        storage0_type: 'SSD',
        brand: 'Dell',
        department: 'TI',
        model: 'T31P',
        status: 'activate',
      });
    }).toThrowError('missing required attributes');
  });

  it('should be able create an Extension', () => {
    const equipment = new Equipment({
      id: '01-003-00434',
      brand: 'Yealink',
      department: 'TI',
      model: 'T31P',
      status: 'activate',
    });

    expect(equipment).toBeInstanceOf(Equipment);
  });

  it('should not be able create an Extension with invalid attributes', () => {
    expect(() => {
      new Equipment({
        id: '01-003-00434',
        brand: 'Yealink',
        department: 'TI',
        model: 'T31P',
        status: 'activate',
        video: 'GTX 1060',
      });
    }).toThrowError('Invalid equipments attributes');
  });

  it('should be able create an Monitor', () => {
    const monitor = new Equipment({
      id: '01-002-00434',
      brand: 'LG',
      department: 'TI',
      model: '24MK430H',
      status: 'activate',
    });

    expect(monitor).toBeInstanceOf(Equipment);
  });

  it('should not be able create an Monitor with invalid attributes', () => {
    expect(() => {
      new Equipment({
        id: '01-002-00490',
        brand: 'LG',
        department: 'TI',
        model: '24MK430H',
        status: 'activate',
        ram: '8GB',
      });
    }).toThrowError('Invalid monitor attributes');
  });
});
