import { IUserAssignmentsRepository } from '../../../domain/repository/user-assignments-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class FindAllUsersAssignmentsUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute(): Promise<FindAllEquipmentsPerUserOutput> {
    const userAssignments = await this.userAssignmentsRepository.findAll();

    if (!userAssignments) {
      throw new EquipmentNotFoundError();
    }

    return {
      userAssignments,
    };
  }
}

type FindAllEquipmentsPerUserOutput = {
  userAssignments: {
    props: {
      user: {
        props: {
          user_name: string;
          complete_name: string;
          title: string;
          department_id: string;
          telephone: number | null;
          direct_boss: string;
          smtp: string;
          admission_date: string;
          demission_date: string | null;
          status: string;
        };
      };
      equipment: {
        props: {
          id: string;
          brand: string;
          model: string;
          supplier: string;
          invoice: string | null;
          warranty: string | null;
          purchase_date: string | null;
          department: string;
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
      };
    };
  }[];
};
