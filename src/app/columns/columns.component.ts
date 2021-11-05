import {Component, OnInit} from '@angular/core';
import {SortService} from "../sort.service";

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {

  constructor(public sortService: SortService) {
  }

  ngOnInit(): void {
  }

}
