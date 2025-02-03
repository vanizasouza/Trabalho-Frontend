import {Component, Input} from '@angular/core';
import { Task } from '../core/models/task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() task!: Task; // Recebe a tarefa (task) de outro componente, que passa a tarefa para este componente

  constructor(private router: Router) {} // Inicia o componente e injeta o roteador para permitir navegação entre telas

// Define os diferentes tipos de status possíveis para uma tarefa
  tiposStatus = [
    { value: 1, viewValue: 'A FAZER' }, // Status 1 - A tarefa ainda precisa ser feita
    { value: 2, viewValue: 'EM ANDAMENTO' }, // Status 2 - A tarefa está em progresso
    { value: 3, viewValue: 'CONCLUÍDO' } // Status 3 - A tarefa foi concluída
  ];

// Função para obter o nome do status a partir de um valor numérico (1, 2, 3)
// Retorna o nome do status ou 'Desconhecido' se o valor não for encontrado
  getValoresTipoStatus(statusValue: 1 | 2 | 3 | undefined): string {
    const status = this.tiposStatus.find(option => option.value === statusValue!); // Procura o status correspondente
    return status ? status.viewValue : 'Desconhecido'; // Se encontrar, retorna o nome do status; se não, retorna 'Desconhecido'
  }

// Função para navegar até a tela de edição de uma tarefa
  editarTask() {
    this.router.navigate(['/editar-task', this.task.id]); // Redireciona para a tela de edição, passando o ID da tarefa como parâmetro
  }
}
