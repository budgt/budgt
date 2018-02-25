import { Subcategory } from './subcategory';

export interface Category {
    'id': number;
    'name': String;
    'type': categoryType;
    'amount': number;
    'subcategories': Subcategory[];
}
enum categoryType { INCOME, EXPENSE }
