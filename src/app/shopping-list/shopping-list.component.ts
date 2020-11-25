import { ShoppingListService } from '../shared/Services/shopping-list.service';
import { Ingredient } from './../shared/Models/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
	// providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[];
	clickedIngredient: Ingredient;
	ingredientToUpdate: Ingredient;

	constructor(private shoppingListService: ShoppingListService) { }

	//ROUTINE FUNCTIONS
	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.clickedIngredient = this.shoppingListService.getIngredients()[0];
		this.ingredientToUpdate = this.shoppingListService.ingredientToUpdate;
		this.shoppingListService.ingredientsChanged.subscribe((ingredientList: Ingredient[]) => this.ingredients = ingredientList);
		this.shoppingListService.ingredientBeingUpdated.subscribe((ingredient: Ingredient) => this.ingredientToUpdate = ingredient);
	}

	//UPDATE INGREDIENT AMOUNT
	onDecreaseIngredientAmount() {
		this.shoppingListService.updateIngredient.decreaseIngredientAmount();
	}
	onIncreaseIngredientAmount() {
		this.shoppingListService.updateIngredient.increaseIngredientAmount();
	}
	onFinishUpdatingIngredient() {
		this.shoppingListService.finishUpdatingIngredient();
	}
}
