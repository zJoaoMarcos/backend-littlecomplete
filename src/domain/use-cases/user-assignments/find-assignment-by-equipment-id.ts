import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class FindAssignmentByEquipmentIdUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute(id: string): Promise<FindAssignmentByEquipmentIdOutput> {
    const userAssignments =
      await this.userAssignmentsRepository.findByEquipmentId(id);

    if (!userAssignments) {
      throw new EquipmentNotFoundError();
    }

    const user = userAssignments;

    return {
      user,
    };
  }
}

type FindAssignmentByEquipmentIdOutput = {
  user: {
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department_id: number;
      telephone: number | null;
      direct_boss: string;
      smtp: string;
      admission_date: Date;
      demission_date: Date | null;
      status: string;
    };
  };
};
