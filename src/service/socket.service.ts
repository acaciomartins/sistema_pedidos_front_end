import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public chamarNome(nome) {
    this.socket.emit('chamar-nome', nome);
  }

  public receberNome = () => {
    return Observable.create((observer) => {
      this.socket.on('receber-nome', (nome) => {
        observer.next(nome);
      });
    });
  }

  public pedidoRealizado = () => {
    return Observable.create((observer) => {
      this.socket.on('pedido-realizado', (status) => {
        observer.next(status);
      });
    });
  }
}
