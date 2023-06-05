import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

export class FindAssignmentsByUserNameUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute(userName: string): Promise<FindAssignmentsByUserNameOutput> {
    const { equipments } = await this.userAssignmentsRepository.findByUserName(
      userName,
    );

    if (!equipments) {
      throw new EquipmentNotFoundError();
    }

    return {
      equipments,
    };
  }
}

type FindAssignmentsByUserNameOutput = {
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
