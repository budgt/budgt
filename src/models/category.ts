import { Subcategory } from './subcategory';

export interface Category {
    'id': number;
    'name': String;
    'type': categoryType;
    'amount': number;
    'subcateogry': Subcategory;
}
enum categoryType { INCOME, EXPENSE }
