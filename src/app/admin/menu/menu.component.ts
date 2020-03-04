import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let logado = localStorage.getItem('admin');
    if (!logado) {
      this.router.navigate(['admin']);
    }
  }

  pedido = () => {
    this.router.navigate(['admin/home']);
  }

  cadastrarProduto = () => {
    this.router.navigate(['admin/cadastrar/produtos']);
  }

  sair = () => {
    localStorage.clear();
    this.router.navigate(['admin']);
  }
}
