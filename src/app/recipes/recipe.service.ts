import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

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
            'https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04043817/product-hamburger.png',
            [
                new Ingredient('burger', 1),
                new Ingredient('ham', 1),
            ]
        ),
    ];

    constructor(
        private shoppingListService: ShoppingListService
    ) {}

    public setRecipes(recipes: Recipe[]) {
        console.log('fetched recipes', recipes);
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipe(id: number) {
        return this.recipes[id];
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
