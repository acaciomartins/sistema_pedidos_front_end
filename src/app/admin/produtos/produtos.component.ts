import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PedidoServiceService } from '../../../service/pedido-service.service'
import { SocketService } from 'src/service/socket.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class AdminProdutosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private pedidoService: PedidoServiceService, private http: HttpClient, private router: Router, private socketService: SocketService) { }

  public pedido: any;
  public btnChamarSenha: boolean;
  public btnIniciar: boolean;
  public btnEntregar: boolean;

  ngOnInit() {
    this.pedido = this.pedidoService.getPedido();
    if (this.pedido.situacao_pedido == 0) {
      this.btnIniciar = true;
      this.btnChamarSenha = false;
      this.btnEntregar = false;
    }

    if (this.pedido.situacao_pedido == 1) {
      this.btnIniciar = false;
      this.btnChamarSenha = true;
      this.btnEntregar = true;
    }


    console.log('Pedido: ', this.pedido);


  }

  iniciarPedido = () => {
    //atualizar status para iniciado 1 
    this.http.put(`http://localhost:3000/pedido/${this.pedido.id}`, { "situacao_pedido": 1 })
      .subscribe(() => {
        this.btnIniciar = false;
        this.btnChamarSenha = true;
        this.btnEntregar = true;
      });
  }

  entregarPedido = () => {
    this.http.put(`http://localhost:3000/pedido/${this.pedido.id}`, { "situacao_pedido": 2 })
      .subscribe(() => {
        this.btnIniciar = false;
        this.btnChamarSenha = false;
        this.btnEntregar = false;
      });
    this.router.navigate(['admin/home']);
    //atualizar status para iniciado 2 
  }

  voltar = () => {
    this.router.navigate(['admin/home']);
  }

  chamarNome = () => {
    //chamar a senha
    this.socketService.chamarNome(this.pedido.cliente.nome_cliente);
  }
}
