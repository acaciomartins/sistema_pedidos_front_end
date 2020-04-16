import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

import { ModalPedidosComponent } from '../modal-pedidos/modal-pedidos.component';
import { NullAstVisitor } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class VendasHomeComponent implements OnInit {

  public quantidade: number = 0;
  public listaProdutos: any[];
  public listaSanduiches: any[];
  public listaBebidas: any[];

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;
  nome: string;

  // constructor(private http: HttpClient) { }
  constructor(private http: HttpClient, private modalService: NgbModal, private sanitizer: DomSanitizer, private router: Router) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    this.nome = localStorage.getItem('cliente');
    if (!this.nome) {
      this.router.navigate(['vendas']);
    }
    this.listarProdutos();
  }

  adicionarItem = (produto) => {
    produto.quantidade = produto.quantidade ? parseInt(produto.quantidade) + 1 : 1;
    // produto.quantidade = produto.quantidade++;

  }

  removerItem = (produto) => {

    produto.quantidade = Number.isNaN(parseInt(produto.quantidade)) ? 0 : produto.quantidade;
    produto.quantidade = produto.quantidade == 0 ? 0 : produto.quantidade - 1;
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

      p.img = imagem;
      p.quantidade = 0;
    }))

    this.listaSanduiches = this.listaProdutos.filter((p) => p.categoria == 0);
    this.listaBebidas = this.listaProdutos.filter((p) => p.categoria == 1);

    console.log('this.listaBebidas: ', this.listaBebidas);
  }

  open(dadosModal) {
    const modalRef = this.modalService.open(ModalPedidosComponent);

    modalRef.componentInstance.fecharModal = dadosModal.fecharModal;
    modalRef.componentInstance.salvarPedido = dadosModal.salvarPedido;
    modalRef.componentInstance.valorTotal = dadosModal.valorTotal;
    modalRef.componentInstance.pedido = dadosModal.pedido;
    modalRef.componentInstance.aviso = dadosModal.aviso;
    modalRef.componentInstance.my_modal_title = dadosModal.titulo;
    modalRef.componentInstance.my_modal_content = dadosModal.mensagem;
  }

  fazerPedido = () => {
    console.log('this.listaProdutos: ', this.listaProdutos);
    let listaProdutosPedidos = this.listaProdutos.filter((produto) => {
      return produto.quantidade > 0;
    });

    let totalPedido = 0;
    let listaProdutos = [];

    listaProdutosPedidos.map((produto) => {
      totalPedido += produto.quantidade * produto.preco_produto;
      let produtoPedido = {
        id_produto: produto.id,
        quantidade_produto: produto.quantidade,
        preco_produto: produto.preco_produto,
        nome_produto: produto.nome_produto
      }
      listaProdutos.push(produtoPedido);
      console.log('listaProdutos: ', listaProdutos);
    });

    if (listaProdutos.length == 0) {
      let dadosModal = {
        aviso: true,
        titulo: 'Pedido',
        mensagem: "Você precisa selecionar pelo menos um produto para continuar!",
        fecharModal: this.fecharModal

      }
      this.open(dadosModal);
    } else {
      let dadosModal = {
        aviso: false,
        titulo: 'Pedido',
        pedido: listaProdutos,
        valorTotal: totalPedido,
        salvarPedido: this.salvarPedido,
        fecharModal: this.fecharModal
      }
      this.open(dadosModal);
    }

  }

  fecharModal = () => {
    const modalRef = this.modalService.open(ModalPedidosComponent);
    modalRef.close('Close click ');
  }

  salvarPedido = (modal, pedido, valorTotal) => {
    console.log('salvando pedido');
    let id_cliente = localStorage.getItem('id_cliente');
    this.http.post(`http://localhost:3000/pedido`,
      {
        "id_cliente": id_cliente,
        "situacao_pedido": 0,
        "valor_total": valorTotal,
        "lista_produtos": pedido
      }
    ).subscribe((pedido) => {
      modal.activeModal.close('Close click ');
      let dadosModal = {
        aviso: true,
        titulo: 'Pedido',
        mensagem: "Pedido realizado com sucesso! \n Aguarde sua senha ser chamada! \n Senha:" + pedido['senha_pedido'],
        fecharModal: this.fecharModal

      }
      this.open(dadosModal);
    });
  }

  sair = () => {
    localStorage.clear();
    this.router.navigate(['vendas']);
  }
}
