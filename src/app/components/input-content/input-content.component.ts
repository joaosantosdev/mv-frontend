import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'input-content',
  templateUrl: './input-content.component.html',
  styleUrls: ['./input-content-component.css']
})
export class InputContentComponent implements OnInit {
  public messagesErrors: any = {
    email: 'Email inválido',
    required: 'Campo obrigatório',
    passwordDistinct: 'Senha incorreta'
  };
  @Input()
  public control;


  @Input()
  public opcional = false;
  @Input()
  public class;
  @Input()
  public label;

  constructor() {
  }

  @Input()
  public error;

  getError(): any {
    const errors = this.control.errors;
    if (errors) {
      const validators = ['required', 'email', 'passwordDistinct'];
      for (const v of validators) {
        if (errors[v]) {
          return this.messagesErrors[v];
        }
      }
    }
    return null;
  }

  ngOnInit(): void {

  }

  getControl(): any {
    return this.control ? this.control : {};
  }

}
