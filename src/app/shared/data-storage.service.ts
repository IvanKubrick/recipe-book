import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ){}

    storeRecipes(): Observable<any> {
        console.log('save', this.recipeService.getRecipes());
        const token = this.authService.getToken();
        return this.httpClient.put(
            `https://ng-recipe-book-c1273.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes(),
            {
                params: new HttpParams().set('auth', token)
            }
        );
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>(
            `https://ng-recipe-book-c1273.firebaseio.com/recipes.json`,
            {
                params: new HttpParams().set('auth', token)
            }
        )
        .pipe(
            map(recipes => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
        )
        .subscribe((recipes) => {
            this.recipeService.setRecipes(recipes);
        });
    }
}
