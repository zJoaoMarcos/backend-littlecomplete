/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '../../core/entities/entity';

interface EquipmentProps {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
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
}

export class Equipment extends Entity<EquipmentProps> {
  static create(props: EquipmentProps) {
    const equipment = new Equipment({
      ...props,
    });

    return equipment;
  }

  get id() {
    return this.props.id;
  }

  get brand() {
    return this.props.brand;
  }

  get model() {
    return this.props.model;
  }

  get supplier() {
    return this.props.supplier;
  }

  get invoice() {
    return this.props.supplier;
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

  get slots() {
    return this.props.slots;
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

  set id(id: string) {
    this.props.id = id;
  }

  set brand(brand: string) {
    this.props.brand = brand;
  }

  set model(model: string) {
    this.props.model = model;
  }

  set supplier(supplier: string) {
    this.props.supplier = supplier;
  }

  set invoice(invoice: string) {
    this.props.invoice = invoice;
  }

  set warranty(warranty: string) {
    this.props.warranty = warranty;
  }

  set purchase_date(purchase_date: string) {
    this.props.purchase_date = purchase_date;
  }

  set department(department: string) {
    this.props.department = department;
  }

  set status(status: string) {
    this.props.status = status;
  }

  set cpu(cpu: string) {
    this.props.cpu = cpu;
  }

  set ram(ram: string) {
    this.props.ram = ram;
  }

  set slots(slots: number) {
    this.props.slots = slots;
  }

  set storage0_type(storage0_type: string) {
    this.props.storage0_type = storage0_type;
  }

  set storage0_syze(storage0_syze: number) {
    this.props.storage0_syze = storage0_syze;
  }

  set storage1_type(storage1_type: string) {
    this.props.storage1_type = storage1_type;
  }

  set storage1_syze(storage1_syze: number) {
    this.props.storage1_syze = storage1_syze;
  }

  set video(video: string) {
    this.props.video = video;
  }

  set service_tag(service_tag: string) {
    this.props.service_tag = service_tag;
  }
}
