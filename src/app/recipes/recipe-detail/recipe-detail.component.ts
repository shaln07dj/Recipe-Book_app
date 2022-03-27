import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  //@Input is added so that we can set it from outside
  // @Input() recipe:Recipe
   recipe:Recipe;
   id:number;


  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    // const id =this.route.snapshot.params['id']
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipe(this.id)
      }
    )
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})

    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})

  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
