export class UpdateEquipmentDto {
  id: string;
  type: string | null;
  brand: string | null;
  model: string | null;
  patrimony: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchaseDate: Date | null;
  departmentId: number;
  status: string;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0Type: string | null;
  storage0Syze: number | null;
  storage1Type: string | null;
  storage1Syze: number | null;
  video: string | null;
  serviceTag: string | null;
  createdBy: string;
}
