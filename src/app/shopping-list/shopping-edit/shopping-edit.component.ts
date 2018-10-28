import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    editedItem: Ingredient;
    editMode: boolean = false;

    private editedItemIndex: number;
    private subscriptions: Subscription[] = [];

    @ViewChild('f') shoppingListForm: NgForm;

    constructor(
        private shoppinglistService: ShoppingListService,
        private store: Store<fromShoppingList.AppState>,
    ) {}

    ngOnInit() {
        this.subscriptions.push(this.shoppinglistService.startedEditing.subscribe( (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppinglistService.getIngredient(index);
            this.shoppingListForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
            });
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
            this.editMode = false;
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
        }
        form.reset();
    }

    onClear() {
        this.shoppingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
        this.onClear();
    }
}
