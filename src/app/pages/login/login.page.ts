import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/Utils';
import UserService from '../../services/UserService';
import {Dialog} from '../../utils/Dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {

  public showLogin = true;
  public formLogin: FormGroup;
  public formRegister: FormGroup;
  public loading = false;

  constructor(private builder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.cleanForm();
  }

  cleanForm(): void {
    this.formLogin = this.builder.group({
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    this.formRegister = this.builder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  getLabel(value): string {
    return value ? 'Login' : 'Criar conta';
  }

  toggleLogin(): any {
    this.showLogin = !this.showLogin;
  }

  getControl(key): FormControl {
    const group = this.showLogin ? this.formLogin : this.formRegister;
    return group.get(key) as FormControl;
  }

  async callService(key, value): Promise<any> {
    this.loading = true;
    await this.userService[key](value).then(response => {
      this.cleanForm();
      if (key === 'login') {
        Utils.setToken(response.data);
        this.router.navigate(['/cargos']);
      }
    }).catch(error => {
      Dialog.info({message: error.error.data});
    });
    this.loading = false;
  }

  async submit(): Promise<any> {
    if (this.loading) {
      return;
    }

    if (this.showLogin) {
      if (this.formLogin.valid) {
        this.callService('login', this.formLogin.value);
      }
      Utils.validateFields(this.formLogin.controls);
    } else {
      if (this.formRegister.valid) {
        this.callService('register', this.formRegister.value);
      }
      Utils.validateFields(this.formRegister.controls);
    }
  }

}
