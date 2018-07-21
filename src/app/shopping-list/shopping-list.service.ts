import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 2)
    ];

    public getIngredients() {
        return this.ingredients;
    }

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
    }
}
