export class CreateEquipmentDto {
  id: string;
  brand: string | null;
  patrimony: string;
  type: string;
  model: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchaseDate: Date | null;
  departmentId: number | null;
  currentUser: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0Type: string | null;
  storage0Syze: number | null;
  storage1Type: string | null;
  storage1Syze: number | null;
  video: string | null;
  serviceTag: string | null;
}
