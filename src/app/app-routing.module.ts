import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPessoasComponent } from './listagem-clientes/listagem-pessoas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listagem-pessoas'},
  { path: 'listagem-pessoas', component: ListagemPessoasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
