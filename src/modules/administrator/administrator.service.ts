import { FindAdministratorByEmailUseCase } from '@/domain/administrators/use-cases/find-administrator-by-email';
import { RegisterAdministratorUseCase } from '@/domain/administrators/use-cases/register-administrator';
import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@Injectable()
export class AdministratorService {
  constructor(
    private registerAdministratorUseCase: RegisterAdministratorUseCase,
    private findAdministratorByEmailUseCase: FindAdministratorByEmailUseCase,
  ) {}

  async create(createAdministratorDto: CreateAdministratorDto) {
    try {
      const { administrator } = await this.registerAdministratorUseCase.execute(
        {
          ...createAdministratorDto,
        },
      );

      return administrator.props;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const { administrator } =
        await this.findAdministratorByEmailUseCase.execute({
          email,
        });

      return administrator.props;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
