import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private columns = 50;
  private maxHeight= 50;
  public array: number[] = [];
  public steps: [number[]] = [[]];
  private sorted = false;
  private timeouts: number[] = [];

  constructor() {
    this.reset();
  }
  public bubbleSort(){
    let sorted = false;
    let round = 0;
    let array = this.array.slice(0);
    while(!sorted){
      sorted = true;
      for(let i = 0; i < array.length - 1 - round; i++){
        if(array[i] > array[i+1]){
          let temp = array[i];
          array[i] = array[i+1];
          array[i+1] = temp;
          sorted = false;
          this.steps.push(array.slice(0));
        }
      }
      round++;
    }
  }

  public reset() {
    while (this.timeouts.length > 0) {
      clearTimeout(this.timeouts.pop());
    }
    this.sorted = false;
    this.array = [];
    for(let i = 0; i < this.columns; i++){
      this.array.push(Math.ceil(Math.random()*this.maxHeight));
    }
  }

  public sort(){
    if(!this.sorted){
      this.bubbleSort();
      for(let i = 0; i < this.steps.length; i++){
        this.timeouts.push(setTimeout(() => {
          this.array = this.steps.shift()!;
        }, 25*i));
      }
      this.sorted = true;
    }
  }
}
