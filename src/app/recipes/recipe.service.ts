import { Injectable, Output, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    public selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Cheeseburger',
            'Cheeseburger description',
            'https://mcdonalds.com.au/sites/mcdonalds.com.au/files/Product_thumb_Cheeseburger-Triple_0.png',
            [
                new Ingredient('burger', 1),
                new Ingredient('cheese', 1),
            ]
        ),
        new Recipe('Hamburger',
            'Hamburger description',
            'http://westendpizzahartford.com/wp-content/uploads/2017/12/hamburger.png',
            [
                new Ingredient('burger', 1),
                new Ingredient('ham', 1),
            ]
        ),
    ];

    constructor(
        private shoppingListService: ShoppingListService
    ) {}

    public getRecipes() {
        return this.recipes;
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
