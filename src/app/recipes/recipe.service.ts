
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/indredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable() /*We need to access the shopping list service 
As if we want to inject service into a service we need to add @injectable*/
export class RecipeService{

    // recipeSelected=new EventEmitter<Recipe>()
    recipesChanged=new Subject<Recipe[]>()


    private recipes:Recipe[]=[
        new Recipe(
        'Tasty Schnitzel',
        'A super-tasty Schntizel - just awesome! ',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',20)

        ]),
        new Recipe('Big Fat Burger ',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
        ])

    ]; 

    constructor(private slService:ShoppingListService){

    }
    getRecipes(){
    return this.recipes.slice();/*If we do it simply without slice,I actually return the direct reference to this array and since
    arrays and objects are reference types in Javascript ,well if we now change something on this array,we will change  it on the 
    array in this service. ===>Therefore, I will call slice with no argumnents,this will simply return a new array which is an exact
    copy of the one in this service file. So therefore, we really can't access the recipes array stored here from outside,we only
    get a copy.*/
}

    getRecipe(index:number){
        return this.recipes[index];
    }

addIngredientsToShoppingList(ingredirents:Ingredient[]){
    this.slService.addIngredients(ingredirents)

}

addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice())
}

deleteRecipe(index:number){
    this.recipes.splice(index)
    this.recipesChanged.next(this.recipes.slice());
}
}


