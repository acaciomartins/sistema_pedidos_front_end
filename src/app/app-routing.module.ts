import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent  } from "./admin/login/login.component";
import { AdminHomeComponent  } from "./admin/home/home.component";
import { AdminProdutosComponent  } from "./admin/produtos/produtos.component";
import { MenuComponent  } from "./admin/menu/menu.component";
import { CadastroProdutoComponent  } from "./admin/cadastro-produto/cadastro-produto.component";

import { VendasHomeComponent } from "./vendas/home/home.component"
import { VendasLoginComponent } from "./vendas/login/login.component"
import { PainelComponent } from './painel/painel/painel.component';


const routes: Routes = [
  { path: 'admin/menu', component: MenuComponent},
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin/produtos', component: AdminProdutosComponent },
  { path: 'admin/cadastrar/produtos', component: CadastroProdutoComponent },
  { path: 'vendas', component: VendasLoginComponent },
  { path: 'vendas/home', component: VendasHomeComponent },
  { path: 'painel', component: PainelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
