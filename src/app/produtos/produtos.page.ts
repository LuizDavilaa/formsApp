import { Produto } from './../models/Produto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  formProduto: FormGroup;
  produto: Produto = new Produto();

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formProduto = this.formBuilder.group(
      {
        nomeProduto: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        descricao: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        validade: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        preco: ['', Validators.compose([Validators.required, Validators.maxLength(8)])]
      },
    );
  }

  ngOnInit() {}

  async salvarProduto() {
    if (this.formProduto.valid){
      this.produto.nomeProduto = this.formProduto.value.nomeProduto;
      this.produto.descricao = this.formProduto.value.descricao;
      this.produto.validade = this.formProduto.value.validade;
      this.produto.preco = this.formProduto.value.preco;
      await this.storageService.set(this.produto.nomeProduto, this.produto);
    } else {
      alert ('Formulário invalido');
    }
  }

}
