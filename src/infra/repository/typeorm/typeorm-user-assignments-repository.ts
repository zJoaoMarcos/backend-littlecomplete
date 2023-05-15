import { Repository } from 'typeorm';
import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import {
  FindByUserNameOutput,
  IUserAssignmentsRepository,
} from '../../../domain/repository/user-assignments-repository';
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
        user: true,
        equipment: true,
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
          brand: assignments.equipment.brand,
          model: assignments.equipment.model,
          supplier: assignments.equipment.supplier,
          invoice: assignments.equipment.invoice,
          warranty: assignments.equipment.warranty,
          purchase_date: assignments.equipment.purchaseDate,
          department: {
            id: assignments.user.department.id,
            name: assignments.user.department.name,
          },
          status: assignments.equipment.status,
          cpu: assignments.equipment.cpu,
          ram: assignments.equipment.ram,
          slots: assignments.equipment.slots,
          storage0_type: assignments.equipment.storage0Type,
          storage0_syze: assignments.equipment.storage0Syze,
          storage1_type: assignments.equipment.storage1Type,
          storage1_syze: assignments.equipment.storage1Syze,
          video: assignments.equipment.video,
          service_tag: assignments.equipment.serviceTag,
        }),
      });
    });
  }

  async findByEquipmentId(id: string): Promise<User> {
    const assignment = await this.ormRepo.findOne({
      where: { equipment: { id: id } },
      relations: {
        user: true,
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
      relations: { user: true, equipment: true },
    });

    if (!assignments) {
      return null;
    }

    const equipments = assignments.map((assignments) => {
      return Equipment.create({
        id: assignments.equipment.id,
        brand: assignments.equipment.brand,
        model: assignments.equipment.model,
        supplier: assignments.equipment.supplier,
        invoice: assignments.equipment.invoice,
        warranty: assignments.equipment.warranty,
        purchase_date: assignments.equipment.purchaseDate,
        department: {
          id: assignments.user.department.id,
          name: assignments.user.department.name,
        },
        status: assignments.equipment.status,
        cpu: assignments.equipment.cpu,
        ram: assignments.equipment.ram,
        slots: assignments.equipment.slots,
        storage0_type: assignments.equipment.storage0Type,
        storage0_syze: assignments.equipment.storage0Syze,
        storage1_type: assignments.equipment.storage1Type,
        storage1_syze: assignments.equipment.storage1Syze,
        video: assignments.equipment.video,
        service_tag: assignments.equipment.serviceTag,
      });
    });

    return { equipments };
  }
}
