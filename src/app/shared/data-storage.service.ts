import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ){}

    storeRecipes(): Observable<any> {
        console.log('save', this.recipeService.getRecipes());
        return this.http.put(
            'https://ng-recipe-book-c1273.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()
        );
    }

    getRecipes() {
        this.http.get(
            'https://ng-recipe-book-c1273.firebaseio.com/recipes.json'
        ).subscribe((response: Recipe[]) => {
            const recipes = response;
            this.recipeService.setRecipes(recipes);
        });
    }
}
