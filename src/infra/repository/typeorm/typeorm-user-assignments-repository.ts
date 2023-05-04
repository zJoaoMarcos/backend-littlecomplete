import { Repository } from 'typeorm';
import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import {
  IUserAssignmentsRepository,
  ResponseUserAssignments,
} from '../../../domain/repository/user-assignments-repository';
import { EquipmentUserSchema } from './entities/equipments-user.schema';

export class TypeOrmUserAssignmentsRepository
  implements IUserAssignmentsRepository
{
  constructor(private ormRepo: Repository<EquipmentUserSchema>) {}

  async save(user: User, equipment: Equipment): Promise<UserAssignments> {
    const assignment = await this.ormRepo.save({
      user: {
        username: user.user_name,
      },
      equipment: {
        id: equipment.id,
      },
    });

    return UserAssignments.create({
      user: User.create({
        user_name: assignment.user.username,
        complete_name: assignment.user.completeName,
        title: assignment.user.title,
        telephone: assignment.user.telephone,
        department_id: assignment.user.departmentId,
        direct_boss: assignment.user.directBoss,
        smtp: assignment.user.smtp,
        admission_date: assignment.user.admissionDate,
        status: assignment.user.status,
        demission_date: assignment.user.demissionDate,
      }),
      equipment: Equipment.create({
        id: assignment.equipment.id,
        brand: assignment.equipment.brand,
        model: assignment.equipment.model,
        supplier: assignment.equipment.supplier,
        invoice: assignment.equipment.invoice,
        warranty: assignment.equipment.warranty,
        purchase_date: assignment.equipment.purchaseDate,
        department: assignment.equipment.department,
        status: assignment.equipment.status,
        cpu: assignment.equipment.cpu,
        ram: assignment.equipment.ram,
        slots: assignment.equipment.slots,
        storage0_type: assignment.equipment.storage0Type,
        storage0_syze: assignment.equipment.storage0Syze,
        storage1_type: assignment.equipment.storage1Type,
        storage1_syze: assignment.equipment.storage1Syze,
        video: assignment.equipment.video,
        service_tag: assignment.equipment.serviceTag,
      }),
    });
  }

  async findAll(): Promise<UserAssignments[]> {
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
          department_id: assignments.user.departmentId,
          direct_boss: assignments.user.directBoss,
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
          department: assignments.equipment.department,
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
      department_id: assignment.user.departmentId,
      direct_boss: assignment.user.directBoss,
      smtp: assignment.user.smtp,
      admission_date: assignment.user.admissionDate,
      status: assignment.user.status,
      demission_date: assignment.user.demissionDate,
    });
  }

  async findByUserName(userId: string): Promise<ResponseUserAssignments> {
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
        department: assignments.equipment.department,
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
