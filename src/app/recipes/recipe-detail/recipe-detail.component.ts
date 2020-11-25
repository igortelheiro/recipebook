import { ShoppingListService } from './../../shared/Services/shopping-list.service';
import { Ingredient } from './../../shared/Models/ingredient.model';
import { RecipesService } from './../../shared/Services/recipes.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from './../../shared/Models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
	// providers: [RecipesService]
})
export class RecipeDetailComponent implements OnInit {
	oppenedRecipe: Recipe;
	ingredients: Ingredient[];
	recipeBeingEdit: Recipe;

	@ViewChild('nameInput', {static: false}) nameInput: ElementRef;
	@ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private recipesService: RecipesService, private shoppingListService: ShoppingListService) { }

  ngOnInit() {
		this.oppenedRecipe = this.recipesService.getRecipes()[0];
		this.ingredients = this.shoppingListService.getIngredients();
		this.recipesService.oppenedRecipeChanged.subscribe((recipe: Recipe) => this.oppenedRecipe = recipe);
		this.shoppingListService.ingredientsChanged.subscribe((ingredientList: Ingredient[]) => this.ingredients = ingredientList);
	}

	//DROPRIGHT FUNCTIONS
	addRecipeToShoppingList() {
		this.oppenedRecipe.ingredients.forEach(ingredient => this.recipesService.addIngredientToShoppingList(ingredient));
	}
	editRecipe() {
		this.recipeBeingEdit = this.oppenedRecipe;
	}
	addIngredientIntoRecipe(_name: HTMLInputElement, _amount: HTMLInputElement) {
		let ingredient = new Ingredient(_name.value, parseInt(_amount.value));
		this.recipesService.addIngredientIntoRecipe(this.oppenedRecipe, ingredient);

		this.nameInput.nativeElement.value = null;
		this.nameInput.nativeElement.focus();
		this.amountInput.nativeElement.value = null;
	}
	delIngredientFromRecipe(ingredient: Ingredient) {
		this.recipesService.delIngredientFromRecipe(ingredient);
	}
	delRecipe() {
		if (window.confirm('Tem certeza que quer deletar esta receita?')) {
			this.recipesService.delRecipe(this.oppenedRecipe);
			this.oppenedRecipe = this.recipesService.getRecipes()[0];
		}
	}

	//INGREDIENT LIST FUNCTIONS
	isIngredientAlreadyAdded(ingredient: Ingredient) {
		return this.shoppingListService.isIngredientAlreadyAdded(ingredient);
	}
	onAddIngredientToShoppingList(ingredient: Ingredient) {
		this.recipesService.addIngredientToShoppingList(ingredient);
	}
	onDelIngredientOfShoppingList(ingredient: Ingredient) {
		this.recipesService.delIngredientOfShoppingList(ingredient);
	}
}
