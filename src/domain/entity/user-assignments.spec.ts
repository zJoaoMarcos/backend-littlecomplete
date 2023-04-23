import { Equipment } from './equipment';
import { User } from './user';
import { UserAssignments } from './user-assignments';

describe('UserAssignments', () => {
  describe('create', () => {
    it('should create a new UserAssignments instance', () => {
      const userAssignments = UserAssignments.create({
        user: User.create({
          user_name: 'jhon_doe',
          complete_name: 'Jhon Doe',
          telephone: 5432,
          title: 'Developer',
          department_id: 'TI',
          direct_boss: 'Uncle Bob',
          smtp: 'jhon_doe@email.com',
          status: 'active',
          admission_date: '20/04/2001',
          demission_date: null,
        }),
        equipment: Equipment.create({
          id: 'equipment-id',
          brand: 'Dell',
          model: 'XPTO',
          cpu: null,
          ram: null,
          department: 'TI',
          status: 'active',
          invoice: null,
          purchase_date: null,
          service_tag: null,
          slots: 1,
          storage0_syze: 240,
          storage0_type: 'SSD',
          storage1_syze: null,
          storage1_type: null,
          supplier: null,
          video: null,
          warranty: null,
        }),
      });

      expect(userAssignments).toBeInstanceOf(UserAssignments);
      expect(userAssignments.user).toBeInstanceOf(User);
      expect(userAssignments.equipment).toBeInstanceOf(Equipment);
    });
  });
});
