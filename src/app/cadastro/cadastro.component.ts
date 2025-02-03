import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {User} from '../core/models/usuarios';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  registerForm: FormGroup; // Define o formulário para cadastro de um novo usuário

  @Output() userCadastrado = new EventEmitter<User>(); // Emite o evento de cadastro de usuário para outros componentes

  constructor(
      private fb: FormBuilder, // Injeção de dependência do FormBuilder para criar o formulário
      private service: ServiceService // Injeção do serviço para enviar os dados do usuário para o servidor
  ) {
    // Inicializa o formulário com os campos de cadastro e suas validações
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required, // O nome de usuário é obrigatório
        Validators.maxLength(150), // O nome de usuário deve ter no máximo 150 caracteres
        Validators.pattern(/^[\w.@+-]+$/) // O nome de usuário deve seguir um padrão (letras, números e alguns caracteres especiais)
      ]],
      password: ['', [
        Validators.required, // A senha é obrigatória
        Validators.minLength(1), // A senha deve ter pelo menos 1 caractere
        Validators.maxLength(128) // A senha pode ter no máximo 128 caracteres
      ]],
      email: ['', Validators.email], // O campo de email deve ter um formato válido
      first_name: ['', Validators.maxLength(150)], // O primeiro nome pode ter no máximo 150 caracteres
      last_name: ['', Validators.maxLength(150)] // O sobrenome pode ter no máximo 150 caracteres
    });
  }

// Getter para acessar o campo de nome de usuário no formulário
  get username() { return this.registerForm.get('username'); }

// Função chamada ao submeter o formulário
  onSubmit() {
    if (this.registerForm.valid) { // Verifica se todos os campos estão preenchidos corretamente
      const usuario: User = this.registerForm.value; // Cria um objeto de usuário com os dados do formulário
      this.userCadastrado.emit(usuario); // Emite o evento de cadastro com os dados do novo usuário
      console.log('Conta enviada:', usuario); // Exibe no console os dados do usuário

      // Envia os dados do novo usuário para o servidor para criação da conta
      this.service.postUsuarios(usuario).subscribe(response => {
        console.log('Conta criada com sucesso:', response); // Exibe no console a resposta do servidor, indicando sucesso
      });
    }
  }
}
