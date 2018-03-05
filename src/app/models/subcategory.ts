import { BaseEntity } from './base-entity';

export class  Subcategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: String,
        public amount?: number
    ) {
    }
}
