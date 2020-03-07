import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalProdutosComponent } from '../../modal-produtos/modal-produtos.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {

  modalOptions: NgbModalOptions;
  produto: {};

  produtoForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    categoria: new FormControl(''),
    valorUnitario: new FormControl(''),
    descricaoProduto: new FormControl('')
  });

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    // console.log(formulario)
    this.produto = this.route.snapshot.params;
    this.produtoForm.patchValue({
      id: this.produto['id'],
      nome: this.produto['nome_produto'],
      categoria: this.produto['categoria'],
      valorUnitario: this.produto['preco_produto'],
      descricaoProduto: this.produto['descricao'],
    });


    console.log('kk', this.produto['id']);
  }

  alterar(formulario) {
    console.log('formulario.value', formulario.value);
    console.error("tese, ", formulario.value.id);
    let dadosModal = {
      mensagem: "Produto atualizado com sucesso!!!"

    }
    this.http.put(`https://api-sistema-pedidos.herokuapp.com/produto/${formulario.value.id}`, formulario.value)
      .subscribe(() => {
        console.log('atualizado')
        this.limpar(this.produtoForm);
        this.open(dadosModal);
      });
  }

  open(dadosModal) {
    const modalRef = this.modalService.open(ModalProdutosComponent);

    modalRef.componentInstance.mensagem = dadosModal.mensagem;
  }

  limpar(produtoForm) {
    produtoForm.reset();
    this.produtoForm.patchValue({
      categoria: 0,
    });
  }

  voltar = () => {
    this.router.navigate(['admin/produtos/menu']);
  }
}
