import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

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
      type: string | null;
      brand: string;
      model: string;
      supplier: string;
      invoice: string | null;
      warranty: string | null;
      purchase_date: Date | null;
      department: { id: number; name: string };
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
