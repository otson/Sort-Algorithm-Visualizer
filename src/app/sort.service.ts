import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private columns = 50;
  private maxHeight= 50;
  public array: number[] = [];

  constructor() {
    this.reset();
  }
  public bubbleSort(){
    let sorted = false;
    let round = 0;
    console.log(this.array);
    while(!sorted){
      sorted = true;
      for(let i = 0; i < this.array.length - 1 - round; i++){
        if(this.array[i] > this.array[i+1]){
          let temp = this.array[i];
          this.array[i] = this.array[i+1];
          this.array[i+1] = temp;
          sorted = false;
        }
      }

      round++;
    }
    console.log(this.array);
  }

  public reset() {
    this.array = [];
    for(let i = 0; i < this.columns; i++){
      this.array.push(Math.ceil(Math.random()*this.maxHeight));
    }
  }

  public sort(){
    this.bubbleSort();
  }
}
