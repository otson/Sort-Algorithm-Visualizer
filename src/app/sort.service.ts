import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private columns = 50;
  private maxHeight= 50;
  public array: number[] = [];

  constructor() {
    for(let i = 0; i < this.columns; i++){
      this.array.push(Math.ceil(Math.random()*this.maxHeight));
    }
  }
}
