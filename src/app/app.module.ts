import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminLoginComponent } from './admin/login/login.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { AdminProdutosComponent } from './admin/produtos/produtos.component';
import { VendasLoginComponent } from './vendas/login/login.component';

import { VendasHomeComponent } from './vendas/home/home.component';
import { ModalPedidosComponent } from './vendas/modal-pedidos/modal-pedidos.component';
import { MenuComponent } from './admin/menu/menu.component';
import { CadastroProdutoComponent } from './admin/cadastro-produto/cadastro-produto.component';
import { SocketService } from 'src/service/socket.service';
import { PainelComponent } from './painel/painel/painel.component';
import { ModalProdutosComponent } from './admin/modal-produtos/modal-produtos.component';
import { ModalPainelComponent } from './painel/modal-painel/modal-painel.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminProdutosComponent,
    VendasHomeComponent,
    VendasLoginComponent,
    ModalPedidosComponent,
    ModalPainelComponent,
    MenuComponent,
    CadastroProdutoComponent,
    PainelComponent,
    ModalProdutosComponent,
    ModalPainelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  entryComponents: [
    ModalPedidosComponent,
    ModalPainelComponent,
    ModalProdutosComponent
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
