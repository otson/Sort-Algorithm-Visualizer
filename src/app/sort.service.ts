import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private columns = 50;
  private maxHeight= 100;
  public array: number[] = [];
  public steps: [number[]] = [[]];
  private sorted = false;
  private timeouts: number[] = [];

  constructor() {
    const w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    this.columns = Math.floor(w * 0.8 / 25);
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

  private insertionSort(){
    let array = this.array.slice(0);
    let i = 1
    while(i < array.length){
      let j = i;
      while(j > 0 && array[j-1] > array[j]){
        this.swap(j,j-1, array);
        this.steps.push(array.slice(0));
        j--;
      }
      i++;
    }
  }

  private selectionSort(){
    let array = this.array.slice(0);
    for(let i = 0;  i < array.length - 1; i++){
      let jMin = i;
      for(let j = i + 1; j < array.length; j++){
        if(array[j] < array[jMin]){
          jMin = j;
        }
      }
      if(jMin != i){
        this.swap(i,jMin, array);
        this.steps.push(array.slice(0));
      }
    }
  }

  private quickSort(A: number[], lo: number, hi: number){
    let p = this.partition(A, lo, hi);
    if(lo < p - 1){
      this.quickSort(A, lo, p - 1);
    }
    if(p < hi){
      this.quickSort(A, p, hi);
    }
  }

  private partition(A: number[], lo: number, hi: number) {
    let pivot   = A[Math.floor((hi + lo) / 2)];
    let i = lo;
    let j = hi;
    while (i <= j) {
      while (A[i] < pivot) {
        i++;
      }
      while (A[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(i, j, A);
        this.steps.push(A.slice(0));
        i++;
        j--;
      }
    }
    return i;
  }

  private swap(i: number, j: number, array: number[]) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
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

  public sortUsingQuicksort(){
    if(!this.sorted){
      this.quickSort(this.array.slice(0), 0, this.array.length-1);
      this.animate(8);
      this.sorted = true;
    }
  }

  public sortUsingSelectionSort(){
    if(!this.sorted){
      this.selectionSort();
      this.animate(8);
      this.sorted = true;
    }
  }

  public sortUsingInsertionSort(){
    if(!this.sorted){
      this.insertionSort();
      this.animate();
      this.sorted = true;
    }
  }

  public sortUsingBubbleSort(){
    if(!this.sorted){
      this.bubbleSort();
      this.animate();
      this.sorted = true;
    }
  }

  private animate(speedFactor: number = 1){
    for(let i = 0; i < this.steps.length; i++){
      this.timeouts.push(setTimeout(() => {
        this.array = this.steps.shift()!;
      }, 25*i*speedFactor));
    }
  }
}
