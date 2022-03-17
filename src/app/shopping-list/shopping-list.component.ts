import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient } from '../shared/indredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
// ingredients:Ingredient[]=[
//   new Ingredient('Apples',5),
//   new Ingredient('Tomatoes',10),

// ];
  ingredients:Ingredient[];
  private igChangedSub:Subscription;


  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
   this.igChangedSub= this.slService.ingridentsChanged
    .subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients
    })

  }
  // onIngeriedientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);

  // }

 ngOnDestroy(): void {
     this.igChangedSub.unsubscribe()
 }
}
