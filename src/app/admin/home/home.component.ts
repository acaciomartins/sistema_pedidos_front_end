import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PedidoServiceService } from '../../../service/pedido-service.service'
import { SocketService } from 'src/service/socket.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private http: HttpClient, private pedidoService: PedidoServiceService, private router: Router, private socketService: SocketService) { }
  listaPedidosAberto: any[];
  listaPedidosProduzindo: any[];
  listaPedidosEntregues: any[];

  ngOnInit() {
    this.listarPedidos();
    this.socketService
      .pedidoRealizado()
      .subscribe((status: boolean) => {
        status ? this.listarPedidos() : '';

      });

  }

  listarPedidos = () => {
    this.http.get('http://localhost:3000/pedido/status/0')
      .subscribe(res => this.popularTabelaEmAberto(res));

    this.http.get('http://localhost:3000/pedido/status/1')
      .subscribe(res => this.popularTabelaProduzindo(res));

    this.http.get('http://localhost:3000/pedido/status/2')
      .subscribe(res => this.popularTabelaEntregues(res));
  }

  popularTabelaEmAberto = (pedidos) => {
    this.listaPedidosAberto = pedidos;
    console.log('this.listaPedidosAberto: ', this.listaPedidosAberto);
  }

  popularTabelaProduzindo = (pedidos) => {
    this.listaPedidosProduzindo = pedidos;
    console.log('this.listaPedidosProduzindo: ', this.listaPedidosProduzindo);
  }

  popularTabelaEntregues = (pedidos) => {
    this.listaPedidosEntregues = pedidos;
    console.log('this.listaPedidosEntregues: ', this.listaPedidosEntregues);
  }

  abrirPedido = (pedido) => {
    console.log(pedido);
    this.pedidoService.setPedido(pedido)
    this.router.navigate(['admin/produtos']);
  }

  voltar = () => {
    this.router.navigate(['admin/menu']);
  }

}
