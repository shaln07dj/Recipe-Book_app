import { Ingredient } from './../shared/indredient.model';
// This is a model

// We're going to use a recipe a lot throughout this app and therefore we should definitely clearly define how a recipelooks like,
// so that whenever ew use it in any component,we're always talking about the same structure,about the same kind of object.For this 
// purpose this model file is been created.
 
// What is a Model?
// Model is simply a typescript file 


export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];

    constructor(name:string,dec:string,imagePath:string,ingredients:Ingredient[] ){
        this.name=name;
        this.description=dec;
        this.imagePath=imagePath
        this.ingredients=ingredients;
    }

}