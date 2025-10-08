## COMEÇANDO A RODAR O PROJETO - PASSOS:

## **IMPORTANTE**: É necessário ter :
**Node.js 20.19.0 ou superior**
**Node.js 22.12.0 ou superior (versão mais recente)**

1 - Renomear o arquivo no diretório `api/.env.example` para `.env`

2 - Adicionar valores para as variáveis do .env.
    Abaixo vou deixar valores sugestão para colar na `.env`

    # Database
    DB_CLIENT=mysql2
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=masterkey
    DB_NAME=desafio_maisaedu

    # Server
    PORT=3000
    HOST=0.0.0.0

    # Environment
    NODE_ENV=development

    # JWT Token
    JWT_SECRET=""

2.1 - Para gerar o JWT_SECRET utilizei na opção MD5 HASH: `https://www.md5hashgenerator.com/`

3 - Instalando libs backend
    `cd api`
    `npm install`

4 - Instalando libs frontend 
    `cd app`
    `npm install`

5 - Rodando seeds e migrations:
    `npm run migrate`
    `npm run seed`

6 - Ao acessar `http://localhost:5173/`, a tela de login será exibida. Contando com autenticação JWT. 
    - Abaixo vou deixar um usuário admin e um comum para realizar o login:`
        Usuário admin: Pode criar, editar, excluir e visulizar estudantes
        **LOGIN**: `admin@maisaedu.com.br`
        **SENHA**: `admin123`

        Usuário comum: Pode apenas visualizar alunos
        **LOGIN**: `coordenador@maisaedu.com.br`
        **SENHA**: `coord123`

## Informações:

- Optei por implementar os logins dos administradores apenas pelas seeders, futuramente é relavante implementar uma rota de cadastro dos mesmos.
- O campo que determina a permissão dos admins no banco de dados é: `is_admin`.
- Os middlewares que garantem a segurança foram pensados em ser reutilizáveis e desacoplados, pensando que essa aplicação poderia evoluir (princípio DRY)
- O backend está garantindo a segurança das rotas, validando se o usuário está logado, e é admin.
- O frontend apenas está garantindo a UI\UX sobre a visualização de um user comum/admin. Escondendo botões,etc.

- A listagem de alunos é paginada, garantindo a perfomance.
- Existe a ordenação de todos os campos em ordem crescente/decrescente/alfebética.
- A pesquisa por alunos pode ser feita através de qualquer campo, sendo nome, email, cpf, RA.
- O sistema valida e garante a integridade do banco de dados, possuindo validações para a duplicidade dos campos: email, cpf e RA,
- Para garantir uma aplicação robusta, ao excluir um aluno, apenas torno o campo `is_active=0`, pois podem existir regras de negócio ligadas a ele (pensando na evolução da aplicação)
- RA e CPF não podem ser editados, o sistema garante essa condição em todas as camadas.
- O knex está previnindo SQL Injection.









