import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() height = 0;
  @Input() sortClass: string = '';

  constructor() {
    console.log(this.sortClass);
  }

  ngOnInit(): void {

  }

}
