import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import { Task } from '../core/models/task';
import {ServiceService} from '../service.service';

class TaskFormComponent {
}

@Component({
  selector: 'app-nova-tarefa',
  standalone: false,

  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  taskForm: FormGroup; // Define o formulário onde o usuário vai preencher os dados da tarefa
  opcoesStatus = [ // Define as opções de status para a tarefa
    { value: 1, viewValue: 'A FAZER' },
    { value: 2, viewValue: 'EM PROGRESSO' },
    { value: 3, viewValue: 'CONCLUÍDO' }
  ];

  @Output() taskCreated = new EventEmitter<Task>(); // Emite a tarefa criada para outros componentes

  constructor(
    private fb: FormBuilder, // Usado para construir o formulário
    private service: ServiceService // Serviço que vai processar os dados da tarefa
  ) {
    this.taskForm = this.fb.group({ // Cria o formulário com campos e validações
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]], // Nome da tarefa
      description: ['', [Validators.required, Validators.minLength(1)]], // Descrição da tarefa
      planned_hours: ['', [Validators.required, Validators.min(0)]], // Horas planejadas
      status: [null], // Status da tarefa
      owner: ['', [Validators.required]] // Dono da tarefa
    });
  }

// Quando o formulário é enviado
  onSubmit() {
    if (this.taskForm.valid) { // Se o formulário estiver correto
      const task: Task = this.taskForm.value; // Cria a tarefa com os dados preenchidos
      this.taskCreated.emit(task); // Emite a tarefa criada para outro componente
      console.log('Task enviada:', task); // Exibe no console a tarefa criada

      // Envia os dados da tarefa para o serviço para ser processado
      this.service.enviarDadosTask(task).subscribe(response => {
        console.log('Task criada com sucesso:', response); // Exibe sucesso no console
      });
    }
  }


}
