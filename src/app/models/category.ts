import { BaseEntity } from './base-entity';
import { Subcategory } from './subcategory';


export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: categoryType,
        public amount?: number,
        public subcategories?: Subcategory[]

    ) {
    }
}
enum categoryType { INCOME, EXPENSE }
