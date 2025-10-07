# +A Educação - Full Stack Web Developer - CHALLENGE

## 1. Arquitetura Escolhida

### Backend
Optei por uma arquitetura em camadas inspirada na Clean Architecture. Dentro dessa arquitetura, podemos observar princípios SOLID, onde isolamos a lógica de negócio e responsabilidades. Com a utilizacao dessa arquitetura foi possível criar um sistema com fácil manutebilidade. O fluxo é simples:

**Request → Routes → Middlewares → Controllers → Services → Repositories → Database**

`Resumo sobre toda estrutura`
- **Routes**: Ponto de entrada, definem os endpoints, roteamento e aplicam middlewares de autenticação e autorização.
- **Controllers**: Recebem requisições, validam dados (com Zod) e chamam os services.
- **Services**: Contêm a lógica de negócio. Ragras, validações.
- **Repositories**: Abstraem o acesso ao banco de dados.
- **Models**: Representação de entidades do banco de dados e validação dos atributos.
- **Middlewares**: Intercepta e trata requisições antes de chamar controllers. Nesse projeto é resposável por autenticação e segurança (JWT).
- **Database**: Utiliza knex para configuração de conexão, migrations e seeds.
- **Errors**: Lógica de tratamento e tipagem de erros para melhor depuração e entendmento.

## Escolhi essa estrutura porque:
- Mantém o código organizado e fácil de compreender, realizar manutenções.
- É um padrão conhecido e bastante utilizado no mercado
- Facilita testes (cada camada pode ser testada isoladamente)

Usei **SQL puro com Knex** ao invés de um ORM completo porque:
- Tenho mais controle sobre as queries
- Em consultas complexas, posso otimizar melhor
- Knex já previne SQL injection e gerencia migrations

O **Zod** foi escolhido porque faz duas coisas ao mesmo tempo: valida os dados em runtime e gera os tipos TypeScript automaticamente. Você define o schema uma vez e tem validação + tipagem.
Além disso, oferece validação declarativa (fácil de ler), mensagens de erro customizáveis e protege contra dados inválidos vindos da API que o TypeScript sozinho não pegaria. `Centralização de regras de validaçao e controllers mais limpos`

### Frontend
Estrutura simples com Vue:
- **Services**: Comunicação com a API (axios configurado)
- **Views**: Páginas completas
- **Components**: Componentes reutilizáveis (componentes de forms reutilizáveis por ex.)
- **Utils**: Funções auxiliares (formatação, autenticação, wrappers de libs como sweetalert2 para alerts, etc)

Usei Composition API do Vue 3 porque é mais moderna e permite melhor organização do código.

---

## 2. Tecnologias Principais

### Backend
- **Fastify** (ao invés de Express): Mais performatico, otimizado, moderno, permite validação de dados nativa e possui suporte com TypeScript nativo
- **TypeScript**: Type-safety em todo código
- **Knex  + MySQL**: Como se trata de um projeto pequeno e queria controle sobre as queries, escolhi o knex. Prisma também seria uma ótima escolha, visando produtividade.
- **Zod**: Validação de dados com inferência de tipos
- **JWT + bcrypt**: Autenticação segura, criptografia de senhas
- **Jest**: Testes unitários

### Frontend  
- **Vue 3**: Interface, Framework moderno
- **Vuetify**: UI Material Design
- **MDI**: Ícones
- **TypeScript**: Tipagem forte
- **Axios**: Requisições HTTP à API
- **SweetAlert2**: Alertas visuais
- **Vite**: Build rápido do projeto

---

## 3. O Que Melhoraria com Mais Tempo

### Backend
- Migraria para NestJS (arquitetura ainda mais robusta com DI)
- Implementaria Swagger para documentação da API
- Configuraria Docker para facilitar deploy
- Implementaria testes mais específicos.

### Frontend
- Criaria testes de componentes (Vitest/Cypress)
- Melhoraria responsividade mobile
- Adicionaria modo escuro
- Implementaria validação real de CPF

---

## 4. Requisitos Obrigatórios

**Todos os requisitos foram entregues com sucesso:**

- CRUD completo de alunos
- Qualidade do código (Seguindo Clean Arquitecture e principios SOLID)
- Qualidade da API
- Validação de todos os campos (nome, email, RA, CPF)
- Interface seguindo os mockups
- Vue.js + Vuetify no frontend
- Node.js com TypeScript no backend
- MySQL como banco de dados

### Extras Implementados E DIFERENCIAIS::

Segui todos os critérios e adicionei:

- Autenticação JWT completa (login, proteção de rotas)
- Autorização por perfil (campo is_admin)
- Paginação com controle de itens por página
- Busca por qualquer campo
- 18 testes unitários nas controllers (admin & students)
- Tratamento de erros centralizado
- Segurança em camadas (frontend + backend)
---
