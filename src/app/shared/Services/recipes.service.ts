import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../Models/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../Models/recipe.model';

@Injectable()
export class RecipesService {
	recipesChanged = new EventEmitter<Recipe[]>();
	oppenedRecipeChanged = new EventEmitter<Recipe>();

	recipes: Recipe[] = [
		new Recipe('Espetinho Misto', 'Ótima receita de churrasco', 'https://www.nps.gov/subjects/camping/images/recipe_1.jpg',
			[
				new Ingredient('Pimentão verde', 1),
				new Ingredient('Pimentão vermelho', 1),
				new Ingredient('Linguiça', 2),
				new Ingredient('Picanha', 1),
				new Ingredient('Frango', 3),
			]
		),
		new Recipe('Camarao', 'Camarão Gostosin', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
			[
				new Ingredient('Camarão', 8),
				new Ingredient('Alecrim', 5),
			]
		)
	]

	constructor(private shoppingListService: ShoppingListService) { }

	getRecipes() {
		return this.recipes.slice();
	}

	openNewRecipe(recipe: Recipe) {
		this.oppenedRecipeChanged.emit(recipe);
	}

	//MANAGE RECIPE
	// TODO: addRecipe() {	}

	addIngredientIntoRecipe(recipe: Recipe, ingredient: Ingredient) {
		if (ingredient.name.length >= 3 && ingredient.amount > 0) {
			let recipeBeingEdit = this.recipes.indexOf(recipe);
			let isIngredientAlreadyAdded = this.recipes[recipeBeingEdit].ingredients.findIndex(i => i.name == ingredient.name) >= 0 ? true : false;
			if (!isIngredientAlreadyAdded) {
				this.recipes[recipeBeingEdit].ingredients.push(ingredient);
				this.recipesChanged.emit(this.recipes);
			}
		}
	}
	delIngredientFromRecipe(ingredient: Ingredient) {
		this.recipes = this.recipes.filter(item => item.ingredients = item.ingredients.filter(item => item != ingredient));
		this.recipesChanged.emit(this.recipes);
	}
	delRecipe(recipe: Recipe) {
		this.recipes = this.recipes.filter(item => item != recipe);
		this.recipesChanged.emit(this.recipes);
	}

	//SHOPPING LIST FUNCTIONS
	addIngredientToShoppingList(ingredient: Ingredient) {
		this.shoppingListService.addIngredient(ingredient);
	}
	delIngredientOfShoppingList(ingredient: Ingredient) {
		this.shoppingListService.delIngredient(ingredient);
	}
}
