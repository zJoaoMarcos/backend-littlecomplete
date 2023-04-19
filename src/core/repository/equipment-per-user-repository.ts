export interface EquipmentPerUserRepositoryInterface {
  save(user_name: string, equipment_id: string): void;
}
