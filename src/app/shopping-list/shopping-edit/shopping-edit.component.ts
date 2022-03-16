import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/indredient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('nameInput') nameInputRef:ElementRef;
@ViewChild('amountInput') amountInputRef:ElementRef;
//@Output() so that we can listen to it form outside
// @Output() ingredientAdded=new EventEmitter<Ingredient>()
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
  }
onAddItem(){
  const ingName=this.nameInputRef.nativeElement.value;
  const ingAmount=this.amountInputRef.nativeElement.value;
  const newIngredient=new Ingredient(ingName,ingAmount)
  // this.ingredientAdded.emit(newIngredient)
  this.slService.addIngredient(newIngredient)

}
}
