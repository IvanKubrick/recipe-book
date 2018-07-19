import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'Test recipe desc', 'https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal-620x264.jpg'),
        new Recipe('Test Recipe 2', 'Test recipe 2 desc', 'https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal-620x264.jpg')
    ];

    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    constructor() { }

    ngOnInit() {
    }

    public onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }
}
