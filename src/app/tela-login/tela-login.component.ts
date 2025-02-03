import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {Router} from '@angular/router';
import {User} from '../core/models/usuarios';

@Component({
  selector: 'app-tela-login',
  standalone: false,

  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent {
  loginForm: FormGroup; // Variável para armazenar o formulário de login
  mensagemDeErro: string = ''; // Variável para exibir mensagens de erro

  // Construtor que inicializa o formulário de login
  constructor(
    private fb: FormBuilder, // Injeção de dependência do FormBuilder para criar o formulário
    private service: ServiceService, // Injeção do serviço para buscar os dados dos usuários
    private router: Router // Injeção do roteador para navegar entre telas
  ) {
    // Inicializa o formulário com campos de email e senha, com validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email, obrigatório e com validação de formato
      password: ['', Validators.required] // Campo de senha, obrigatório
    });
  }

  // Getters para acessar os controles do formulário
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // Função chamada ao submeter o formulário
  onSubmit() {
    // Verifica se o formulário é válido
    if (this.loginForm.invalid) {
      this.mensagemDeErro = 'Por favor, preencha todos os campos corretamente.'; // Exibe mensagem de erro
      return;
    }

    this.mensagemDeErro = ''; // Limpa a mensagem de erro

    const formEmail = this.loginForm.value.email; // Pega o email inserido no formulário

    // Chama o serviço para buscar todos os usuários
    this.service.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Procura um usuário com o email informado
        const foundUser = users.find(user =>
          user.email === formEmail // Verifica se o email do usuário corresponde ao inserido
        );

        // Se encontrar o usuário, salva os dados no localStorage e redireciona para a tela inicial
        if (foundUser) {
          localStorage.setItem('currentUser', JSON.stringify(foundUser)); // Armazena os dados do usuário logado
          this.router.navigate(['/tela-inicial-geral']); // Navega para a tela inicial
        }
      },
    });
  }
}
