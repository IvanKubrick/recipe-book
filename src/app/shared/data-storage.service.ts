import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ){}

    storeRecipes(): Observable<any> {
        console.log('save', this.recipeService.getRecipes());
        const token = this.authService.getToken();
        return this.http.put(
            `https://ng-recipe-book-c1273.firebaseio.com/recipes.json?auth=${token}`,
            this.recipeService.getRecipes()
        );
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get(
            `https://ng-recipe-book-c1273.firebaseio.com/recipes.json?auth=${token}`
        ).subscribe((recipes: Recipe[]) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            this.recipeService.setRecipes(recipes);
        });
    }
}
