/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '@/core/entities/entity';

export interface EquipmentProps {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
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

  get type() {
    return this.props.type;
  }

  get currentUser() {
    return this.props.currentUser;
  }

  get patrimony() {
    return this.props.patrimony;
  }

  get brand() {
    return this.props.brand;
  }

  get model() {
    return this.props.model;
  }

  get supplier() {
    return this.props.purchase.supplier;
  }

  get invoice() {
    return this.props.purchase.supplier;
  }

  get warranty() {
    return this.props.purchase.warranty;
  }

  get purchaseDate() {
    return this.props.purchase.purchaseDate;
  }

  get departmentId() {
    return this.props.department.id;
  }

  get departmentName() {
    return this.props.department.name;
  }

  get status() {
    return this.props.status;
  }

  get cpu() {
    return this.props.config.cpu;
  }

  get ram() {
    return this.props.config.ram;
  }

  get slots() {
    return this.props.config.storage.slots;
  }

  get storage0Type() {
    return this.props.config.storage.storage0Type;
  }

  get storage0Syze() {
    return this.props.config.storage.storage0Syze;
  }

  get storage1Type() {
    return this.props.config.storage.storage1Type;
  }

  get storage1Syze() {
    return this.props.config.storage.storage1Syze;
  }

  get video() {
    return this.props.config.video;
  }

  get serviceTag() {
    return this.props.serviceTag;
  }

  set id(id: string) {
    this.props.id = id;
  }

  set type(type: string) {
    this.props.type = type;
  }

  set patrimony(patrimony: string) {
    this.props.patrimony = patrimony;
  }

  set brand(brand: string) {
    this.props.brand = brand;
  }

  set model(model: string) {
    this.props.model = model;
  }

  set supplier(supplier: string) {
    this.props.purchase.supplier = supplier;
  }

  set invoice(invoice: string) {
    this.props.purchase.invoice = invoice;
  }

  set warranty(warranty: string) {
    this.props.purchase.warranty = warranty;
  }

  set purchaseDate(purchaseDate: Date) {
    this.props.purchase.purchaseDate = purchaseDate;
  }

  set departmentId(id: number) {
    this.props.department.id = id;
  }

  set departmentName(name: string) {
    this.props.department.name = name;
  }

  set status(status: string) {
    this.props.status = status;
  }

  set cpu(cpu: string) {
    this.props.config.cpu = cpu;
  }

  set ram(ram: string) {
    this.props.config.ram = ram;
  }

  set slots(slots: number) {
    this.props.config.storage.slots = slots;
  }

  set storage0Type(storage0Type: string) {
    this.props.config.storage.storage0Type = storage0Type;
  }

  set storage0Syze(storage0Syze: number) {
    this.props.config.storage.storage0Syze = storage0Syze;
  }

  set storage1Type(storage1Type: string) {
    this.props.config.storage.storage1Type = storage1Type;
  }

  set storage1Syze(storage1Syze: number) {
    this.props.config.storage.storage1Syze = storage1Syze;
  }

  set video(video: string) {
    this.props.config.video = video;
  }

  set serviceTag(serviceTag: string) {
    this.props.serviceTag = serviceTag;
  }
}
