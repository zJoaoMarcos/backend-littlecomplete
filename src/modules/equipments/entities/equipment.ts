interface EquipmentProps {
  id: string;
  brand: string;
  model: string;
  supplier?: string;
  invoice?: string;
  warranty?: string;
  purchase_date?: string;
  department: string;
  status: string;
  cpu?: string;
  ram?: string;
  slots?: number;
  storage0_type?: string;
  storage0_syze?: number;
  storage1_type?: string;
  storage1_syze?: number;
  video?: string;
  service_tag?: string;
}

const desktopPrefix = '01-001';
const monitorPrefix = '01-002';
const extensionPrefix = '01-003';
const notebookPrefix = '01-004';

export class Equipment {
  private props: EquipmentProps;

  get id() {
    return this.props.id;
  }

  get brand() {
    return this.props.brand;
  }

  get supplier() {
    return this.props.supplier;
  }

  get invoice() {
    return this.props.invoice;
  }

  get warranty() {
    return this.props.warranty;
  }

  get purchase_date() {
    return this.props.purchase_date;
  }

  get department() {
    return this.props.department;
  }

  get status() {
    return this.props.status;
  }

  get cpu() {
    return this.props.cpu;
  }

  get ram() {
    return this.props.ram;
  }

  get storage0_type() {
    return this.props.storage0_type;
  }

  get storage0_syze() {
    return this.props.storage0_syze;
  }

  get storage1_type() {
    return this.props.storage1_type;
  }

  get storage1_syze() {
    return this.props.storage1_syze;
  }

  get video() {
    return this.props.video;
  }

  get service_tag() {
    return this.props.service_tag;
  }

  constructor(props: EquipmentProps) {
    const {
      id,
      cpu,
      ram,
      slots,
      storage0_syze,
      storage0_type,
      storage1_syze,
      storage1_type,
      video,
    } = props;

    if (
      id.startsWith(extensionPrefix) &&
      (cpu ||
        ram ||
        slots ||
        storage0_syze ||
        storage0_type ||
        storage1_syze ||
        storage1_type ||
        video)
    ) {
      throw new Error('Invalid extension attributes');
    } else if (
      id.startsWith(monitorPrefix) &&
      (cpu ||
        ram ||
        slots ||
        storage0_syze ||
        storage0_type ||
        storage1_syze ||
        storage1_type ||
        video)
    ) {
      throw new Error('Invalid monitor attributes');
    } else if (
      id.startsWith(desktopPrefix || notebookPrefix) &&
      (!cpu || !ram || !slots || !storage0_syze || !storage0_type)
    ) {
      throw new Error('missing required attributes');
    }

    this.props = {
      ...props,
      supplier: props.supplier || null,
      invoice: props.invoice || null,
      warranty: props.warranty || null,
      purchase_date: props.purchase_date || null,
      cpu: props.cpu || null,
      ram: props.ram || null,
      slots: props.slots || null,
      storage0_type: props.storage0_type || null,
      storage0_syze: props.storage0_syze || null,
      storage1_syze: props.storage1_syze || null,
      storage1_type: props.storage1_type || null,
      video: props.video || null,
      service_tag: props.service_tag || null,
    };
  }
}
