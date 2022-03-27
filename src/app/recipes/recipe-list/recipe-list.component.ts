import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{
  // @Output() recipeWasSelected=new EventEmitter<Recipe>();

//   recipes:Recipe[]=[
//     new Recipe('A Test Recipe','This is simply a test recipe','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=700,636'),
//     new Recipe('Another Test Recipe','This is simply an another test recipe','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=700,636')
// ];  

  recipes:Recipe[]
  subscription:Subscription
  
  constructor(private  recipeService:RecipeService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription=this.recipeService.recipesChanged
    .subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;  
      }
    )
    this.recipes=this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe)

  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});

  }
  ngOnDestroy(){
  this.subscription.unsubscribe()
  }

}
