interface EquipmentProps {
  id: string;
  brand?: string;
  model?: string;
  supplier?: string;
  invoice?: string;
  warranty?: string;
  purchase_date?: string;
  department?: string;
  status?: string;
  cpu?: string;
  ram?: string;
  slots?: number;
  storage0_type: string;
  storage0_syze?: number;
  storage1_type: string;
  storage1_syze?: number;
  video: string;
  service_tag?: string;
}

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
    this.props = props;
  }
}
