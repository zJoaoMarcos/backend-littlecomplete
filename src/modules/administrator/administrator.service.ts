import { FindAdministratorByEmailUseCase } from '@/domain/administrators/use-cases/find-administrator-by-email';
import { RegisterAdministratorUseCase } from '@/domain/administrators/use-cases/register-administrator';
import { UpdateAdministratorPasswordUseCase } from '@/domain/administrators/use-cases/update-administrator-password';
import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AdministratorService {
  constructor(
    private registerAdministratorUseCase: RegisterAdministratorUseCase,
    private findAdministratorByEmailUseCase: FindAdministratorByEmailUseCase,
    private updateAdministratorPasswordUseCase: UpdateAdministratorPasswordUseCase,
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
      console.log(error);
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
      console.log(error);
      throw new Error(error.message);
    }
  }

  async updatePassword(email: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      await this.updateAdministratorPasswordUseCase.execute({
        email,
        ...updatePasswordDto,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
