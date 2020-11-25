import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from './../Models/ingredient.model';

@Injectable()
export class ShoppingListService {
	ingredientsChanged = new EventEmitter<Ingredient[]>();
	ingredientBeingUpdated = new EventEmitter<Ingredient>();

	ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
	]
	ingredientToUpdate: Ingredient = new Ingredient('', 0);

	getIngredients() {
		return this.ingredients.slice();
	}

	isIngredientAlreadyAdded(ingredient: Ingredient) {
		return this.ingredients.findIndex(item => item.name.toLocaleLowerCase() == ingredient.name.toLocaleLowerCase()) >= 0 ? true : false;
	}

	addIngredient(ingredient: Ingredient) {
		if (ingredient.name.length >= 3 && ingredient.amount > 0) {
			if (!this.isIngredientAlreadyAdded(ingredient)) {
				this.ingredients.push(ingredient);
				this.ingredientsChanged.emit(this.ingredients);
			}
		}
	}

	delIngredient(ingredient: Ingredient) {
		this.ingredients = this.ingredients.filter(item => item.name != ingredient.name);
		this.ingredientsChanged.emit(this.ingredients);
	}

	updateIngredient = {
		decreaseIngredientAmount : () => {
			this.ingredients = this.ingredients.filter(item => item.name == this.ingredientToUpdate.name ? item.amount-- : item)
			this.ingredientsChanged.emit(this.ingredients);
		},
		increaseIngredientAmount: () => {
			this.ingredients = this.ingredients.filter(item => item.name == this.ingredientToUpdate.name ? item.amount++ : item)
			this.ingredientsChanged.emit(this.ingredients);
		}
	}

	startUpdatingIngredient(ingredient: Ingredient) {
		this.ingredientToUpdate = ingredient;
		this.ingredientBeingUpdated.emit(ingredient);
	}
	finishUpdatingIngredient() {
		this.ingredientToUpdate = new Ingredient('', 0);
		this.ingredientBeingUpdated.emit(this.ingredientToUpdate);
	}
}
