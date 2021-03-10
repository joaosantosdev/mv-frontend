import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  paginator;

  @Output()
  change = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }


  next(): void {

    if (!this.paginator.last) {
      this.change.emit(this.paginator.page + 1);
    }
  }

  previous(): void {
    if (!this.paginator.first) {
      this.change.emit(this.paginator.page - 1);
    }
  }

}
