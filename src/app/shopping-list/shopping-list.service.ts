import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 2)
    ];

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
    }

    public updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
    }

    public deleteIngredient (index: number) {
        this.ingredients.splice(index, 1);
    }
}
