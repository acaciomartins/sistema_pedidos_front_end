import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  @Input() nome: string;
  @Input() senha: number;

  constructor(private router: Router) { }

  ngOnInit() {
    let logado = localStorage.getItem('admin');
    if (logado) {
      this.router.navigate(['admin/menu']);
    }
  }

  onSubmit(formulario) {
    console.log('submeteu', formulario.value);
    const { nome, senha } = formulario.value;
    if (nome == 'admin' && senha == 'admin') {
      localStorage.setItem('admin', JSON.stringify(nome));
      this.router.navigate(['admin/menu']);
    }

  }

}
