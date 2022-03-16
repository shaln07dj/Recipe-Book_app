import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import {Ingredient } from '../shared/indredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
// ingredients:Ingredient[]=[
//   new Ingredient('Apples',5),
//   new Ingredient('Tomatoes',10),

// ];
ingredients:Ingredient[]

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    this.slService.ingridentsChanged
    .subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients
    })

  }
  // onIngeriedientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);

  // }
}
