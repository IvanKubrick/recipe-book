import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions'

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducers(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const index = action.payload.index;
            const ingredient = state.ingredients[index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[index] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredients1 = [...state.ingredients].splice(action.payload, 1);
            return {
                ...state,
                ingredients: ingredients1
            }
        default:
            return state;
    }
}
