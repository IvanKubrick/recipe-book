import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    editedItem: Ingredient;
    editMode = false;

    private subscriptions: Subscription[] = [];

    @ViewChild('f') shoppingListForm: NgForm;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscriptions.push(
            this.store.select('shoppingList').subscribe(data => {
                if (data.editedIngredientIndex > -1) {
                    this.editedItem = data.editedIngredient;
                    this.editMode = true;
                    this.shoppingListForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                } else {
                    this.editMode = false;
                }
            })
        );
    }

    ngOnDestroy() {
        this.store.dispatch(new ShoppingListActions.StopEdit());
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient({
                    ingredient: newIngredient
                })
            );
            this.editMode = false;
        } else {
            this.store.dispatch(
                new ShoppingListActions.AddIngredient(newIngredient)
            );
        }
        form.reset();
    }

    onClear() {
        this.shoppingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }
}
