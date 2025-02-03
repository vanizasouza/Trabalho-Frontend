import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ParaFazerListaComponent } from './para-fazer-lista/para-fazer-lista.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TerminadoListaComponent } from './terminado-lista/terminado-lista.component';
import { WipListaComponent } from './em-progresso/wip-lista.component';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatInput, MatInputModule} from '@angular/material/input';
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from '@angular/material/card';
import { CadastroComponent } from './cadastro/cadastro.component';
import {HttpClientModule} from '@angular/common/http';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { CardComponent } from './card/card.component';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import { TaskEditarComponent } from './tarefa-editar/task-editar.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ParaFazerListaComponent,
    TelaInicialComponent,
    TerminadoListaComponent,
    WipListaComponent,
    NovaTarefaComponent,
    TelaLoginComponent,
    CadastroComponent,
    CardComponent,
    TaskEditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    MatFormFieldModule,
    MatOption,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogTitle,
    MatInputModule,
    FormsModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    HttpClientModule,
    MatAnchor,
    CdkDrag,
    MatDivider,
    MatIcon,
    MatCardActions,
    MatCardModule,
    MatIconButton,
    MatProgressSpinner
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
