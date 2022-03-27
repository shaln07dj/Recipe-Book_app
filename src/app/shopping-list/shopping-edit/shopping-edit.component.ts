import { from, Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { OnDestroy, ViewChild,  } from '@angular/core';
import { Ingredient } from './../../shared/indredient.model';
import { Component, ElementRef,  OnInit,  } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('formData') slForm:NgForm
  subscription:Subscription;
  editMode=false
  editedItemIndex:number;
  editedItem:Ingredient;
 
//@Output() so that we can listen to it form outside
// @Output() ingredientAdded=new EventEmitter<Ingredient>()
  constructor(private slService:ShoppingListService) { }
 

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing
    .subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getIngredient(index)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }
onSubmit(formData:NgForm){
  const value=formData.value

  const newIngredient=new Ingredient(value.name,value.amount)
  console.log(value.name,value.amount)
  // this.ingredientAdded.emit(newIngredient)
  
  if(this.editMode){
    this.slService.updateIngerdient(this.editedItemIndex,newIngredient);
  }else{
    this.slService.addIngredient(newIngredient)
  }
  this.editMode=false;
  formData.resetForm()

}
onClear(){
  this.editMode=false;
  this.slForm.resetForm()

}
onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex)
  this.onClear()

}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
