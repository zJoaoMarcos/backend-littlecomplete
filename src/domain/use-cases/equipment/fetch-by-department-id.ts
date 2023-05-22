import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FetchByDepartmentIdUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    department_id,
    skip,
    take,
  }: FetchAllEquipmentsInput): Promise<FetchByDepartmentIdOutput> {
    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const { equipments, totalCount } =
      await this.equipmentRepository.findByDepartmentId(department_id, {
        skip,
        take,
      });

    if (!equipments) {
      throw new Error('Equipments not found');
    }

    return {
      equipments,
      totalCount,
    };
  }
}

type FetchAllEquipmentsInput = {
  department_id: number;
  skip?: number;
  take?: number;
};

type FetchByDepartmentIdOutput = {
  totalCount?: number;
  equipments: {
    props: {
      id: string;
      type: string;
      brand: string | null;
      model: string | null;
      supplier: string | null;
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
