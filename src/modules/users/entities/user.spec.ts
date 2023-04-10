import { User } from './user';

describe('User', () => {
  it('should  create a new User', () => {
    const admission_date = new Date();
    const demission_date = new Date();

    demission_date.setDate(demission_date.getDate() + 1);

    const user = new User({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'Developer Full Stack',
      department_id: 'IT',
      telephone: 4344,
      direct_boss: 'Carlos Alexandre',
      smtp: 'jhon.doe@example.com',
      admission_date,
      demission_date,
      status: 'active',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.user_name).toEqual('jhon.doe');
  });

  it('cannot create a new User with a demission date before admission date', () => {
    const admission_date = new Date();
    const demission_date = new Date();

    demission_date.setDate(demission_date.getDate() - 1);

    expect(() => {
      new User({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'Developer Full Stack',
        department_id: 'IT',
        telephone: 4344,
        direct_boss: 'Carlos Alexandre',
        smtp: 'jhon.doe@example.com',
        admission_date,
        demission_date,
        status: 'active',
      });
    }).toThrowError('Invalid date');
  });
});
