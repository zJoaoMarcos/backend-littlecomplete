import { IAdministratorRepository } from '@/domain/administrators/repository/administrator.repository';
import { FindAdministratorByEmailUseCase } from '@/domain/administrators/use-cases/find-administrator-by-email';
import { RegisterAdministratorUseCase } from '@/domain/administrators/use-cases/register-administrator';
import { AdministratorSchema } from '@/infra/repository/typeorm/entities/administrator.schema';
import { TypeOrmAdministratorRepository } from '@/infra/repository/typeorm/typeorm-administrator-repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorSchema])],
  exports: [AdministratorService],
  controllers: [AdministratorController],
  providers: [
    AdministratorService,
    // Repositories

    {
      provide: TypeOrmAdministratorRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmAdministratorRepository(
          dataSource.getRepository(AdministratorSchema),
        );
      },
      inject: [getDataSourceToken()],
    },

    {
      provide: RegisterAdministratorUseCase,
      useFactory: (administratorRepo: IAdministratorRepository) => {
        return new RegisterAdministratorUseCase(administratorRepo);
      },
      inject: [TypeOrmAdministratorRepository],
    },
    {
      provide: FindAdministratorByEmailUseCase,
      useFactory: (administratorRepo: IAdministratorRepository) => {
        return new FindAdministratorByEmailUseCase(administratorRepo);
      },
      inject: [TypeOrmAdministratorRepository],
    },
  ],
})
export class AdministratorModule {}
