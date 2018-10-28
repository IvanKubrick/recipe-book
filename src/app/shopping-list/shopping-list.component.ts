import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    public shoppingListState: Observable<{ ingredients: Ingredient[] }>

    constructor(
        private shoppinglistService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
    ) {}

    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');
    }

    onEditItem(index: number) {
        this.shoppinglistService.startedEditing.next(index);
    }
}
