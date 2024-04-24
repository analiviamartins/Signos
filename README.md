# API de Gerenciamento de Usuários

Bem-vindo à API de Gerenciamento de Usuários! Esta é uma API web construída com Node.js, Express e PostgreSQL para gerenciar usuários. Com esta API, você pode realizar operações básicas de criação, leitura, atualização e exclusão (CRUD) de usuários em um banco de dados PostgreSQL.

## Configuração e Execução

Siga as instruções abaixo para configurar e executar o sistema:

### Pré-requisitos

Antes de começar, verifique se você possui o Node.js e o PostgreSQL instalados em sua máquina.

### Instalação

1. npm init -y
2. npm install express pg
3. npm install -g nodemon
### Configuração do Ambiente

1. Configure as variáveis de ambiente necessárias:
   - `PORT`: Porta em que o servidor será executado.
   - Dados de acesso ao banco de dados PostgreSQL (`user`, `host`, `database`, `password`, `port`).

### Banco de Dados

1. Antes de iniciar o servidor, crie o banco de dados no PostgreSQL.
2. Utilize o script SQL fornecido no diretório `db` para criar o esquema necessário.

### Testando a API

Você pode testar os endpoints da API usando ferramentas como o Insomnia ou o Postman. Configure as requisições conforme descrito nos endpoints abaixo e envie as solicitações para o servidor.

## Endpoints

- **POST /usuarios**: Adiciona um novo usuário. O corpo da requisição deve conter o nome e o email do usuário.
- **GET /usuarios**: Retorna todos os usuários cadastrados.
- **PUT /usuarios/:id**: Atualiza os dados de um usuário existente. O parâmetro da URL deve ser o ID do usuário a ser atualizado, e o corpo da requisição deve conter os novos dados do usuário.
- **DELETE /usuarios/:id**: Exclui um usuário existente. O parâmetro da URL deve ser o ID do usuário a ser excluído.

Agora você está pronto para usar a API de Gerenciamento de Usuários! Divirta-se gerenciando seus usuários! 🚀
