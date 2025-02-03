import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';
import {NovaTarefaComponent} from './nova-tarefa/nova-tarefa.component';
import {TelaLoginComponent} from './tela-login/tela-login.component';
import {CadastroComponent} from './cadastro/cadastro.component';
import {TaskEditarComponent} from './tarefa-editar/task-editar.component';

const routes: Routes = [
  { path: '', component: TelaLoginComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'tela-inicial-geral', component: TelaInicialComponent },
  { path: 'criar-task', component: NovaTarefaComponent },
  { path: 'editar-task/:id', component: TaskEditarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
