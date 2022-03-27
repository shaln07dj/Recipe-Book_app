import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
        private recipeService:RecipeService){}

    storeRecipes(){
        const recipes=this.recipeService.getRecipes()
         this.http.put('https://ng-pract-recipe-book-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(response=>{
           
        });
    }

    fetchRecipes() {
        this.http
          .get<Recipe[]>(
            'https://ng-pract-recipe-book-default-rtdb.firebaseio.com/recipes.json'
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            })
          )
          .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
          });
      }

}