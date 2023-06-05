import { User } from '@/domain/employees/entity/user';
import { Equipment } from '@/domain/inventory/entity/equipment';
import { UserAssignments } from '@/domain/inventory/entity/user-assignments';
import {
  FindByUserNameOutput,
  IUserAssignmentsRepository,
} from '@/domain/inventory/repository/user-assignments.repository';
import { Repository } from 'typeorm';
import { EquipmentsUserSchema } from './entities/equipments-user.schema';

export class TypeOrmUserAssignmentsRepository
  implements IUserAssignmentsRepository
{
  constructor(private ormRepo: Repository<EquipmentsUserSchema>) {}

  async save(userAssignments: UserAssignments): Promise<void> {
    await this.ormRepo.save({
      user: {
        username: userAssignments.user.user_name,
      },
      equipment: {
        id: userAssignments.equipment.id,
      },
    });
  }

  async findMany(): Promise<UserAssignments[]> {
    const assignments = await this.ormRepo.find({
      relations: {
        user: { department: true, directBoss: true },
        equipment: { department: true },
      },
    });

    if (!assignments) {
      return null;
    }

    return assignments.map((assignments) => {
      return UserAssignments.create({
        user: User.create({
          user_name: assignments.user.username,
          complete_name: assignments.user.completeName,
          title: assignments.user.title,
          telephone: assignments.user.telephone,
          department: {
            id: assignments.user.department.id,
            name: assignments.user.department.name,
          },
          direct_boss: assignments.user.directBoss.username,
          smtp: assignments.user.smtp,
          admission_date: assignments.user.admissionDate,
          status: assignments.user.status,
          demission_date: assignments.user.demissionDate,
        }),
        equipment: Equipment.create({
          id: assignments.equipment.id,
          type: assignments.equipment.type,
          status: assignments.equipment.status,
          serviceTag: assignments.equipment.serviceTag,
          patrimony: assignments.equipment.patrimony,
          brand: assignments.equipment.brand,
          model: assignments.equipment.model,
          purchase: {
            supplier: assignments.equipment.supplier,
            invoice: assignments.equipment.invoice,
            warranty: assignments.equipment.warranty,
            purchaseDate: assignments.equipment.purchaseDate,
          },
          config: {
            cpu: assignments.equipment.cpu,
            ram: assignments.equipment.ram,
            video: assignments.equipment.video,
            storage: {
              slots: assignments.equipment.slots,
              storage0Type: assignments.equipment.storage0Type,
              storage0Syze: assignments.equipment.storage0Syze,
              storage1Type: assignments.equipment.storage1Type,
              storage1Syze: assignments.equipment.storage1Syze,
            },
          },
          department: {
            id: assignments.equipment.department
              ? assignments.equipment.department.id
              : null,
            name: assignments.equipment.department
              ? assignments.equipment.department.name
              : null,
          },
          currentUser: null,
        }),
      });
    });
  }

  async findByEquipmentId(id: string): Promise<User> {
    const assignment = await this.ormRepo.findOne({
      where: { equipment: { id: id } },
      relations: {
        user: { department: true, directBoss: true },
      },
    });

    if (!assignment) {
      return null;
    }

    return User.create({
      user_name: assignment.user.username,
      complete_name: assignment.user.completeName,
      title: assignment.user.title,
      telephone: assignment.user.telephone,
      department: {
        id: assignment.user.department.id,
        name: assignment.user.department.name,
      },
      direct_boss: assignment.user.directBoss.username,
      smtp: assignment.user.smtp,
      admission_date: assignment.user.admissionDate,
      status: assignment.user.status,
      demission_date: assignment.user.demissionDate,
    });
  }

  async findByUserName(userId: string): Promise<FindByUserNameOutput> {
    const assignments = await this.ormRepo.find({
      where: { user: { username: userId } },
      relations: {
        user: { department: true, directBoss: true },
        equipment: { department: true },
      },
    });

    if (!assignments) {
      return null;
    }

    const equipments = assignments.map((assignments) => {
      return Equipment.create({
        id: assignments.equipment.id,
        type: assignments.equipment.type,
        status: assignments.equipment.status,
        serviceTag: assignments.equipment.serviceTag,
        patrimony: assignments.equipment.patrimony,
        brand: assignments.equipment.brand,
        model: assignments.equipment.model,
        purchase: {
          supplier: assignments.equipment.supplier,
          invoice: assignments.equipment.invoice,
          warranty: assignments.equipment.warranty,
          purchaseDate: assignments.equipment.purchaseDate,
        },
        config: {
          cpu: assignments.equipment.cpu,
          ram: assignments.equipment.ram,
          video: assignments.equipment.video,
          storage: {
            slots: assignments.equipment.slots,
            storage0Type: assignments.equipment.storage0Type,
            storage0Syze: assignments.equipment.storage0Syze,
            storage1Type: assignments.equipment.storage1Type,
            storage1Syze: assignments.equipment.storage1Syze,
          },
        },
        department: {
          id: assignments.equipment.department
            ? assignments.equipment.department.id
            : null,
          name: assignments.equipment.department
            ? assignments.equipment.department.name
            : null,
        },
        currentUser: null,
      });
    });

    return { equipments };
  }

  async deleteByEquipmentId(id: string): Promise<void> {
    await this.ormRepo.delete({
      equipment: {
        id: id,
      },
    });
  }

  async deleteManyByUserName(userName: string): Promise<void> {
    await this.ormRepo.delete({
      user: {
        username: userName,
      },
    });
  }
}
