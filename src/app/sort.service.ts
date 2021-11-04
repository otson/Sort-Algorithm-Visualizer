import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private columns = 50;
  private maxHeight= 100;
  public numbers: number[] = [];
  public classes: string[] = [];
  public stepNumbers: number[][] = [];
  public stepClasses: string[][] = [];
  private sorted = false;
  private timeouts: number[] = [];

  constructor() {
    const w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    this.columns = Math.floor(w * 0.8 / 25);
    this.reset();
  }
  public bubbleSort(){
    let sorted = false;
    let round = 0;
    let array = this.numbers.slice(0);
    while(!sorted){
      sorted = true;
      for(let i = 0; i < array.length - 1 - round; i++){
        this.addCompareStep(i, i+1, array);
        if(array[i] > array[i+1]){
          this.swap(i,i+1, array);
          sorted = false;

        }
      }
      round++;
    }
  }

  private insertionSort(){
    let array = this.numbers.slice(0);
    let i = 1
    while(i < array.length){
      let j = i;
      while(j > 0 && array[j-1] > array[j]){
        this.swap(j,j-1, array);
        j--;
      }
      i++;
    }
  }

  private selectionSort(){
    let array = this.numbers.slice(0);
    for(let i = 0;  i < array.length - 1; i++){
      let jMin = i;
      for(let j = i + 1; j < array.length; j++){
        this.addCompareStep(j, jMin, array);
        if(array[j] < array[jMin]){
          jMin = j;
        }
      }
      if(jMin != i){
        this.swap(i,jMin, array);
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
        this.addCompareStep(i,j, A);
        i++;
      }
      while (A[j] > pivot) {
        this.addCompareStep(i,j, A);
        j--;
      }
      if (i <= j) {
        this.swap(i, j, A);
        i++;
        j--;
      }
    }
    return i;
  }

  private addCompareStep(i: number, j: number, A: number[]){
    this.stepNumbers.push(A.slice(0));
    let classes = new Array(this.numbers.length);
    classes[i] = 'checking';
    classes[j] = 'checking';
    this.stepClasses.push(classes);
  }

  private addSwapStep(i: number, j: number, A: number[]){
    this.stepNumbers.push(A.slice(0));
    let classes = new Array(this.numbers.length);
    classes[i] = 'swapping';
    classes[j] = 'swapping';
    this.stepClasses.push(classes);
  }

  private swap(i: number, j: number, array: number[]) {
    this.addCompareStep(i,j, array);
    this.addSwapStep(i,j, array);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    this.addSwapStep(i,j, array);
  }

  public reset() {
    while (this.timeouts.length > 0) {
      clearTimeout(this.timeouts.pop());
    }
    this.sorted = false;
    this.numbers = [];
    this.classes = [];
    this.stepNumbers = [];
    this.stepClasses = [];
    for(let i = 0; i < this.columns; i++){
      this.numbers.push(Math.ceil(Math.random()*this.maxHeight));
    }
  }

  public sortUsingQuicksort(){
    this.reset();
    this.quickSort(this.numbers.slice(0), 0, this.numbers.length-1);
    this.animate();
    this.sorted = true;
  }

  public sortUsingSelectionSort(){
    this.reset();
      this.selectionSort();
      this.animate();
      this.sorted = true;

  }

  public sortUsingInsertionSort(){
    this.reset();
      this.insertionSort();
      this.animate();
      this.sorted = true;

  }

  public sortUsingBubbleSort(){
    this.reset();
      this.bubbleSort();
      this.animate(50, 100);
      this.sorted = true;

  }

  private isSwap(classes: string[]){
    for(let className of classes){
      if(className === 'swapping') return true;
    }
    return false;
  }

  private animate(compareDelay: number = 100, swapDelay: number = 500, wasSwap: boolean = false){
    if(this.stepNumbers.length > 0){
      let delay = wasSwap ? swapDelay : compareDelay;
      this.timeouts.push(setTimeout(() => {
        this.numbers = this.stepNumbers.shift()!;;
        this.classes = this.stepClasses.shift()!;
        this.animate(compareDelay, swapDelay, this.isSwap(this.classes));
      }, delay));
    }
  }
}
