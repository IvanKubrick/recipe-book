import { Injectable, Output, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    public selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test Recipe', 'Test recipe desc', 'https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal-620x264.jpg'),
        new Recipe('Test Recipe 2', 'Test recipe 2 desc', 'https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal-620x264.jpg')
    ];

    public getRecipes() {
        return this.recipes.slice();
    }
}
