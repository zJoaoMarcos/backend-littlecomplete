import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/errors/user-not-found';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

export class FindUserByUserNameUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
  ) {}

  async execute(userName: string): Promise<FindUserByUserNameOutput> {
    const user = await this.userRepository.findByUserName(userName);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { equipments } = await this.userAssignmentsRepository.findByUserName(
      userName,
    );

    return {
      user,
      equipments,
    };
  }
}

type FindUserByUserNameOutput = {
  user: {
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department: { id: number | null; name: string | null };
      telephone: number | null;
      direct_boss: string;
      smtp: string;
      admission_date: Date | null;
      demission_date: Date | null;
      status: string;
    };
  };
  equipments: {
    props: {
      id: string;
      type: string;
      brand: string;
      model: string;
      supplier: string;
      invoice: string | null;
      warranty: string | null;
      purchase_date: Date | null;
      department: {
        id: number | null;
        name: string | null;
      };
      status: string;
      cpu: string | null;
      ram: string | null;
      slots: number | null;
      storage0_type: string | null;
      storage0_syze: number | null;
      storage1_type: string | null;
      storage1_syze: number | null;
      video: string | null;
      service_tag: string | null;
    };
  }[];
};
