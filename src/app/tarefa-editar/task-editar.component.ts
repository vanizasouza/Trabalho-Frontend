import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Task } from '../core/models/task';
import { Comment } from '../core/models/comentarios'
import {User} from '../core/models/usuarios';

@Component({
  selector: 'app-tarefa-editar',
  standalone: false,

  templateUrl: './task-editar.component.html',
  styleUrl: './task-editar.component.css'
})
export class TaskEditarComponent implements OnInit {
  taskForm: FormGroup;
  comments: Comment[] = [];
  newComment: FormControl;
  editingCommentId: number | null = null;
  editedCommentText = '';
  currentUserId!: number;
  statusOptions = [
    { value: 1, viewValue: 'To Do' },
    { value: 2, viewValue: 'In Progress' },
    { value: 3, viewValue: 'Done' }
  ];
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newComment = this.fb.control('', Validators.required);

    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      planned_hours: ['', [Validators.required, Validators.min(0)]],
      status: [null, Validators.required],
      owner: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
    } else {
      console.error('Usuário não está logado!');
      this.router.navigate(['/login']);
    }

    this.taskId = +this.route.snapshot.params['id'];
    this.carregarTask();
    this.carregarComentarios();
  }

  carregarComentarios() {
    this.service.getComments(this.taskId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
    });
  }

  adicionarComentario() {
    if (this.newComment.valid) {
      const comment = {
        note: this.newComment.value,
        task: this.taskId,
        user: this.currentUserId
      };

      this.service.addComment(comment).subscribe({
        next: (newComment) => {
          this.comments.push(newComment);
          this.newComment.reset();
        },
      });
    }
  }

  cancelarEdicao() {
    this.editingCommentId = null;
    this.editedCommentText = '';
  }

  salvarEdicao(commentId: number) {
    const comment = this.comments.find(c => c.id === commentId);

    if (comment && this.editedCommentText.trim()) {
      const updatedComment: Comment = {
        ...comment,
        note: this.editedCommentText
      };

      this.service.updateComment(updatedComment).subscribe({
        next: (updated) => {
          const index = this.comments.findIndex(c => c.id === commentId);
          this.comments[index] = updated;
          this.cancelarEdicao();
        },
      });
    }
  }

  carregarTask() {
    this.service.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.preencherFormulario(task);
        this.comments = [];
        this.carregarComentarios();
      },
    });
  }

  preencherFormulario(task: Task) {
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      planned_hours: task.planned_hours,
      status: task.status,
      owner: task.owner
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskAtualizada = { ...this.taskForm.value, id: this.taskId };
      this.service.atualizarTask(taskAtualizada).subscribe({
        next: () => {
          this.router.navigate(['/tela-inicial-geral']);
        },
      });
    }
  }


}
