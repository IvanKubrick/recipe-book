import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    editedItem: Ingredient;

    private editMode: boolean = false;
    private editedItemIndex: number;
    private subscriptions: Subscription[] = [];

    @ViewChild('f') shoppingListForm: NgForm;

    constructor(
        private shoppinglistService: ShoppingListService
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
    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        this.shoppinglistService.addIngredient(newIngredient);
    }
}
