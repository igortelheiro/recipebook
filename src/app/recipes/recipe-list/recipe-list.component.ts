import { RecipesService } from './../../shared/Services/recipes.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/Models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css'],
	// providers: [RecipesService]
})
export class RecipeListComponent implements OnInit {
	@Input() recipes: Recipe[];
	oppenedRecipe: Recipe;
	image: File;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
		this.oppenedRecipe = this.recipesService.getRecipes()[0];
		this.recipesService.oppenedRecipeChanged.subscribe((recipe: Recipe) => this.oppenedRecipe = recipe);
  }

	openRecipe(recipe: Recipe) {
		this.recipesService.openNewRecipe(recipe)
	}

	displayPath(file:HTMLInputElement){
		console.log(file.value)
	}
}
