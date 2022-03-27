import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/indredient.model";
import { Subject } from "rxjs";
export class ShoppingListService{
    
    ingridentsChanged=new Subject<Ingredient[]>();

    startedEditing=new Subject<Number>();
    
    // ingridentsChanged=new EventEmitter<Ingredient[]>();

    /*we basically have to inform our component that new
    data is avaliable.So here I'm simply adding a new emitter.
    This event emitter now can emit our ingredient array,so the type it will pass on is an array of ingredients.... 
    */ 
private ingredients:Ingredient[]=[
  new Ingredient('Apples',5),
  new Ingredient('Tomatoes',10),

];
getIngredients(){
    return this.ingredients.slice();
}
    getIngredient(index:number){
        return this.ingredients[index];

    }

addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)



    // this.ingridentsChanged.emit(this.ingredients.slice())
    /*....and now here whenever we change and emit a new event
    an dwe ofcourse pass a value here, our opiginal ingredients array, only a copy of it.  */

    this.ingridentsChanged.next(this.ingredients.slice())


}

addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //     this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients)
    // this.ingridentsChanged.emit(this.ingredients.slice())
    this.ingridentsChanged.next(this.ingredients.slice())

}
updateIngerdient(index:number,newIngredient:Ingredient){
    this.ingredients[index] =newIngredient;
    this.ingridentsChanged.next(this.ingredients.slice());
}

deleteIngredient(index:number){
    this.ingredients.splice(index,1)/*splice allows us to start at a specific point, for example at index here and then
    splice one element, thus removing it.*/
    this.ingridentsChanged.next(this.ingredients.slice())
}

}