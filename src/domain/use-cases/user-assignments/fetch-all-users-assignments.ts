import { IUserAssignmentsRepository } from '../../../domain/repository/user-assignments-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class FetchAllUsersAssignmentsUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute(): Promise<FetchAllEquipmentsPerUserOutput> {
    const userAssignments = await this.userAssignmentsRepository.findMany();

    if (!userAssignments) {
      throw new EquipmentNotFoundError();
    }

    return {
      userAssignments,
    };
  }
}

type FetchAllEquipmentsPerUserOutput = {
  userAssignments: {
    props: {
      user: {
        props: {
          user_name: string;
          complete_name: string;
          title: string;
          department: { id: number; name: string };
          telephone: number | null;
          direct_boss: string;
          smtp: string;
          admission_date: Date;
          demission_date: Date | null;
          status: string;
        };
      };
      equipment: {
        props: {
          id: string;
          type: string | null;
          brand: string;
          model: string;
          supplier: string;
          invoice: string | null;
          warranty: string | null;
          purchase_date: Date | null;
          department: {
            id: number;
            name: string;
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
      };
    };
  }[];
};