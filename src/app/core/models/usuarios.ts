export class User {
  // Aqui estamos criando uma "classe" chamada User, que serve para organizar os dados de um usuário.

  id!: number;
  // "id" é o identificador do usuário (um número que vai identificar ele de forma única). O "!" diz que o valor vai ser definido mais tarde, em algum momento.

  password!: string;
  // "password" é a senha do usuário, e "string" significa que o valor será uma palavra ou conjunto de caracteres.

  email!: string;
  // "email" é o e-mail do usuário, e o tipo "string" também indica que será uma sequência de caracteres.
}

// models (ou modelos) são estruturas ou classes que representam dados.
// Eles ajudam a definir como os dados são organizados e manipulados dentro da aplicação.


//   Definem a estrutura dos dados: Um model descreve como um objeto de dados será estruturado.
//   Por exemplo, se você estiver criando um aplicativo de cadastro de usuário,
//   o modelo pode incluir campos como nome, email, senha, etc.

// assim como está ai em cima
