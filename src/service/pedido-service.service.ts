import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {

  constructor() { }

  // private pedido = new Subject<any>();
  private pedido: any;

  setPedido = (pedido: any) => {
    //this.pedido.next({ pedido });
    this.pedido = pedido;
  }

  getPedido(): Observable<any> {
    //return this.pedido.asObservable();
    return this.pedido;
}

  // getPedido = () => {
  //   this.pedido.asObservable();
  // }
}
