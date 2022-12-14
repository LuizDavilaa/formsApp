import { StorageService } from './../services/storage.service';
import { Usuario } from './../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formCadastro: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        cpf: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
        confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
      },
    );
  }

  ngOnInit() {}

  async salvarCadastro() {
    if (this.formCadastro.valid){
      this.usuario.nome = this.formCadastro.value.nome;
      this.usuario.cpf = this.formCadastro.value.cpf;
      this.usuario.email = this.formCadastro.value.email;
      this.usuario.senha = this.formCadastro.value.senha;
      await this.storageService.set(this.usuario.email, this.usuario);
      this.route.navigateByUrl('/tab1');
    } else {
      alert ('Formulário invalido');
    }
  }
}
