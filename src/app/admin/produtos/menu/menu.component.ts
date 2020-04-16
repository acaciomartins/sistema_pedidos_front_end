import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalProdutosComponent } from '../../modal-produtos/modal-produtos.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuProdutosComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal, ) { }

  nome: string;
  public listaProdutos: any[];
  public listaSanduiches: any[];
  public listaBebidas: any[];

  ngOnInit() {
    let logado = localStorage.getItem('admin');
    if (!logado) {
      this.router.navigate(['admin']);
    }


    this.listarProdutos();
  }
  cadastrarProduto = () => {
    this.router.navigate(['admin/cadastrar/produtos']);
  }


  listarProdutos = () => {
    this.http.get(`http://localhost:3000/produtos`)
      .subscribe((res) => {
        this.populaProdutos(res);
      });
  }

  populaProdutos = (produtos) => {
    this.listaProdutos = produtos;
    this.listaProdutos.map((p => {
      let imagem = "../../assets/produtos/uploads/" + p.img;

      if (!p.img && p.categoria == 0) {
        imagem = "../../assets/images/sanduice.jpeg";
      } else if (!p.img && p.categoria == 1) {
        imagem = "../../assets/images/latinha.png";
      }

      // let imagem = "https://api-sistema-pedidos.herokuapp.com/produtos/uploads/" + p.img;
      p.img = imagem;
      p.quantidade = 0;
    }))

    this.listaSanduiches = this.listaProdutos.filter((p) => p.categoria == 0);
    this.listaBebidas = this.listaProdutos.filter((p) => p.categoria == 1);

    console.log('this.listaBebidas: ', this.listaBebidas);
  }

  voltar = () => {
    this.router.navigate(['admin/menu']);
  }

  alterar = (produto) => {
    console.log('alterar', produto)
    this.router.navigate(['admin/produtos/alterar', produto]);
  }

  excluir = (produto) => {
    console.log('excluir', produto)
    //atualizar status para iniciado 1

    this.http.delete(`http://localhost:3000/produto/${produto.id}`)
      .subscribe(


        data => {

          console.log('Produto excluido com sucesso!!! id: ', produto.id)
          this.open({ mensagem: "Produto excluido com sucesso!!!" });
          this.listarProdutos()

        },
        err => {
          console.error(err);
          this.open({ mensagem: "Erro ao excluir produto!!!" });
        }

      );
  }

  open(dadosModal) {
    const modalRef = this.modalService.open(ModalProdutosComponent);

    modalRef.componentInstance.mensagem = dadosModal.mensagem;
  }

}
