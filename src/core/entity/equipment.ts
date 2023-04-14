const validPrefixs = [
  '01-001-',
  '01-002-',
  '01-003-',
  '01-004-',
  '01-005-',
  '01-010-',
];

export class Equipment {
  id: string;
  brand: string;
  model: string;
  supplier: string;
  invoice: string | null;
  warranty: string | null;
  purchase_date: string | null;
  department: string;
  status: string;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;

  constructor(
    id: string,
    brand: string,
    model: string,
    department: string,
    status: string,
    supplier = null,
    invoice = null,
    warranty = null,
    purchase_date = null,
    cpu = null,
    ram = null,
    slots = null,
    storage0_type = null,
    storage0_syze = null,
    storage1_type = null,
    storage1_syze = null,
    video = null,
    service_tag = null,
  ) {
    if (!validPrefixs.some((prefix) => id.startsWith(prefix))) {
      throw new Error('Invalid equipment id');
    }

    if (!id) {
      throw new Error('Id is required');
    }

    this.id = id;
    this.brand = brand;
    this.model = model;
    this.supplier = supplier;
    this.invoice = invoice;
    this.warranty = warranty;
    this.purchase_date = purchase_date;
    this.department = department;
    this.status = status;
    this.cpu = cpu;
    this.ram = ram;
    this.slots = slots;
    this.storage0_type = storage0_type;
    this.storage0_syze = storage0_syze;
    this.storage1_type = storage1_type;
    this.storage1_syze = storage1_syze;
    this.video = video;
    this.service_tag = service_tag;
  }
}
