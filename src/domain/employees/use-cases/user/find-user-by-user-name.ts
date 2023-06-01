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
      status: string;
      currentUser: string | null;
      patrimony: string | null;
      type: string | null;
      brand: string | null;
      model: string | null;
      serviceTag: string | null;
      purchase: {
        invoice: string | null;
        supplier: string | null;
        purchaseDate: Date | null;
        warranty: string | null;
      };
      department: {
        id: number | null;
        name: string | null;
      };
      config: {
        cpu: string | null;
        ram: string | null;
        video: string | null;
        storage: {
          slots: number | null;
          storage0Type: string | null;
          storage0Syze: number | null;
          storage1Type: string | null;
          storage1Syze: number | null;
        };
      };
    };
  }[];
};
