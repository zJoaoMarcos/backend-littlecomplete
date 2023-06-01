import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { DepartmentNotFoundError } from '@/domain/errors/department-not-found';
import { UserNotFoundError } from '@/domain/errors/user-not-found';

export class FetchByDepartmentIdUseCase {
  constructor(
    private userRepository: IUserRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    departmentId,
    skip,
    take,
  }: FetchByDepartmentIdInput): Promise<FetchByDepartmentIdOutput> {
    const departmentExists = await this.departmentRepository.findById(
      departmentId,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const { users, totalCount } = await this.userRepository.findByDepartmentId(
      departmentId,
      {
        skip,
        take,
      },
    );

    if (!users) {
      throw new UserNotFoundError();
    }

    return {
      users,
      totalCount,
    };
  }
}

type FetchByDepartmentIdInput = {
  departmentId: number;
  skip: number;
  take: number;
};

type FetchByDepartmentIdOutput = {
  users: {
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
  }[];
  totalCount: number;
};
