import { RecipesService } from './../shared/Services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/Models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css'],
	// providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
		this.recipes = this.recipesService.getRecipes();
		this.recipesService.recipesChanged.subscribe((recipeList: Recipe[]) => this.recipes = recipeList);
	}
}
