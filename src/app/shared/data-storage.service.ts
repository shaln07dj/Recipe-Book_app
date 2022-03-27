import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
        private rescipeServce:RecipeService){}

    storeRecipe(){
        const recipes=this.rescipeServce.getRecipes()
         this.http.put('https://ng-pract-recipe-book-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(response=>{
            console.log(response)
        });
    }

}