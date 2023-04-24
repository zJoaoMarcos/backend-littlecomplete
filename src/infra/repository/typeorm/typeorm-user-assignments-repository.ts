import { Equipment } from 'src/domain/entity/equipment';
import { User } from 'src/domain/entity/user';
import { UserAssignments } from 'src/domain/entity/user-assignments';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { Repository } from 'typeorm';
import { EquipmentUserSchema } from './entities/equipments-user.schema';

export class TypeOrmUserAssignments implements IUserAssignmentsRepository {
  constructor(private ormRepo: Repository<EquipmentUserSchema>) {}

  async save(user: User, equipment: Equipment): Promise<UserAssignments> {
    const userAssignments = UserAssignments.create({ user, equipment });

    return this.ormRepo.save(userAssignments);
  }

  async findAll(): Promise<UserAssignments[]> {
    const assignments = await this.ormRepo.find();

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

  async findByEquipmentId(id: string): Promise<UserAssignments> {
    const assignment = await this.ormRepo.findOneBy({
      equipment: { id: id },
    });

    if (!assignment) {
      return null;
    }

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

  async findByUserName(id: string): Promise<UserAssignments[]> {
    const assignments = await this.ormRepo.findBy({
      user: { username: id },
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
}
