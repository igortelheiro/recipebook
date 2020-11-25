import { ShoppingListService } from '../../shared/Services/shopping-list.service';
import { Ingredient } from '../../shared/Models/ingredient.model';
import { Component, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
	styles: [ 'button {margin-right: 10px;}' ],
	// providers: [ShoppingListService]
})
export class ShoppingEditComponent {
	@ViewChild('nameInput', {static: false}) ingredientName: ElementRef;
	@ViewChild('amountInput', {static: false}) ingredientAmount: ElementRef;

	@Input() clickedIngredient: Ingredient;

	constructor(private shoppingListService: ShoppingListService) {	}

	//BUILD INPUTED INGREDIENT
	buildIngredient() {
		let name = this.ingredientName.nativeElement.value;
		let amount = this.ingredientAmount.nativeElement.value;
		return new Ingredient(name, amount);
	}

	//BUTTONS
	onAddIngredient() {
		this.shoppingListService.addIngredient(this.buildIngredient());
	}
	onDelIngredient() {
		this.shoppingListService.delIngredient(this.clickedIngredient);
	}
	onClearFields() {
		this.ingredientName.nativeElement.value = null;
		this.ingredientName.nativeElement.focus();
		this.ingredientAmount.nativeElement.value = null;
	}
	onUpdateIngredient() {
		this.shoppingListService.startUpdatingIngredient(this.clickedIngredient);
	}
}
