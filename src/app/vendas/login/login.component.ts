import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class VendasLoginComponent implements OnInit {

  @Input() nome: string;
  @Input() telefone: number;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    let logado = localStorage.getItem('cliente');
    if (logado) {
      this.router.navigate(['vendas/home']);
    }
  }

  onSubmit(formulario) {
    console.log('submeteu', formulario.value);
    const { nome, celular } = formulario.value;
    if (nome && celular) {
      localStorage.setItem('cliente', JSON.stringify(nome));
      localStorage.setItem('telefone', JSON.stringify(celular));

      this.http.post(`https://api-sistema-pedidos.herokuapp.com/cliente`,
        {
          "nome_cliente": nome,
          "telefone_cliente": celular
        }
      ).subscribe((obj) => {
        console.log(obj)
        localStorage.setItem('id_cliente', JSON.stringify(obj['id']));
        this.router.navigate(['vendas/home']);
      });
    }
  }
}
