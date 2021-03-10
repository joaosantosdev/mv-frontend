import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.css']
})
export class SelectSearchComponent implements OnInit {

  search = '';
  value = '';
  activeSearch = false;
  _model: any = null;

  @Input()
  set model(val: any) {
    const items = this.options.filter(item => item[this.id] === val);
    if (items.length > 0) {
      this.value = items[0][this.field];
      this.search = this.value;
    } else {
      this._model = undefined;
      this.search = '';
      this.value = '';
    }
  }

  @Output()
  modelChange = new EventEmitter();

  @Output()
  change = new EventEmitter();

  @Input()
  options;


  @Input()
  field;

  @Input()
  id;


  public isOpen = false;

  constructor() {
    document.addEventListener('click', (event) => {
      const element: any = event.target;
      let close = true;
      const classes = ['input-search', 'content-options', 'option', 'input-text-select-search', 'icon-select-search'];
      for (const _class of element.classList) {
        if (classes.includes(_class)) {
          close = false;
        }
      }

      if (close) {
        this.isOpen = !close;
        this.activeSearch = false;
        this.search = this.value;
      }
    });

  }

  ngOnInit(): void {
    const items = this.options.filter(item => item[this.id] === this.model);
    if (items.length > 0) {
      this.value = items[0][this.field];
      this.search = this.value;
    }
  }

  toggle(event): any {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  open(): void {
    this.isOpen = true;
  }

  onChange(item): void {
    this.model = item[this.id];
    this.value = item[this.field];
    this.search = this.value;
    this.activeSearch = false;
    this.isOpen = false;
    this.modelChange.emit(item[this.id]);
    this.change.emit(item[this.id]);

  }

  getOptions(): any {
    if (this.activeSearch) {
      return this.options.filter(option => {
        const field: string = option[this.field];
        if (field.toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    return this.options;
  }

  onSearch(event): void {
    this.activeSearch = true;
  }
}
