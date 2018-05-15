import { BaseEntity } from './base-entity';
import { Subcategory } from './subcategory';


export class Category implements BaseEntity {
    public keys: any[];
    public types = categoryType;

    constructor(
        public id?: number,
        public name?: string,
        public type?: categoryType,
        public amount?: number,
        public subcategories?: Subcategory[]
    ) {
        this.keys = Object.keys(this.types).filter(f => !isNaN(Number(f)));    }
}
enum categoryType { INCOME, EXPENSE }
