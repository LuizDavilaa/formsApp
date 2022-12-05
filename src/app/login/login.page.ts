import { Login } from './../models/Login';
import { StorageService } from './../services/storage.service';
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  login: Login = new Login();

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) {
    this.formLogin = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        senha: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),],
      },
    );
  }

  ngOnInit() {}

  async salvarLogin() {
    if (this.formLogin.valid){
      this.login.email = this.formLogin.value.email;
      this.login.senha = this.formLogin.value.senha;
      await this.storageService.set(this.login.email, this.login);
      
    } else {
      alert ('Formulário invalido');
    }
  }
}
