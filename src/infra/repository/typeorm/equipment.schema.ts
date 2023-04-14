import { Equipment } from 'src/core/entity/Equipment';
import { EntitySchema } from 'typeorm';

export const EquipmentSchema = new EntitySchema<Equipment>({
  name: 'departments',
  target: Equipment,
  tableName: 'equipments',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    supplier: {
      type: String,
    },
    invoice: {
      type: String,
    },
    warranty: {
      type: String,
    },
    department: {
      type: String,
    },
    status: {
      type: String,
    },
    cpu: {
      type: String,
    },
    ram: {
      type: String,
    },
    slots: {
      type: Number,
    },
    storage0_type: {
      type: String,
    },
    storage0_syze: {
      type: Number,
    },
    storage1_syze: {
      type: Number,
    },
    storage1_type: {
      type: String,
    },
    service_tag: {
      type: String,
    },
  },
  relations: {},
});
