import { BaseEntity } from './base-entity';

export enum accountType {
  COMDIRECT
}

export class Account implements BaseEntity {
  public keys: any[];
  public types = accountType;

  constructor(
    public id?: number, //
    public name?: string,
    public type?: accountType,
    public clientId?: string,
    public clientSecret?: string
  ) {
    this.keys = Object.keys(this.types).filter(f => !isNaN(Number(f)));
  }
}
