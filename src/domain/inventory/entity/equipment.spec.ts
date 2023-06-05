import { Equipment } from './equipment';

describe('Equipment', () => {
  it('should be able create an Equipment', () => {
    const equipment = new Equipment({
      id: '01-005-00434',
      type: 'Monitor',
      brand: 'Dell',
      model: 'T31P',
      supplier: 'Dell',
      status: 'avaliable',
      department: {
        id: 1,
        name: 'IT',
      },
      cpu: 'core i7',
      ram: '16 GB',
      slots: 2,
      storage0_syze: 240,
      storage0_type: 'SSD',
      storage1_syze: null,
      storage1_type: null,
      video: null,
      service_tag: null,
      warranty: null,
      invoice: null,
      purchase_date: new Date(),
    });

    expect(equipment).toBeInstanceOf(Equipment);
  });
});
