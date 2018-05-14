import { BaseEntity } from './base-entity';

export class  Subcategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public amount?: number
    ) {
    }
}
