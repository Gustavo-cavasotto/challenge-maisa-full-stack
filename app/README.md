# Frontend - Sistema de Gestão de Alunos

Frontend desenvolvido com Vue.js 3, TypeScript e Vuetify para o sistema de gestão de alunos.

## 🚀 Tecnologias

- **Vue.js 3** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vuetify 3** - Framework de UI
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 📋 Funcionalidades

- ✅ **Login** - Autenticação de administradores
- ✅ **Listagem de Alunos** - Visualizar todos os alunos cadastrados
- ✅ **Cadastro de Aluno** - Adicionar novo aluno
- ✅ **Edição de Aluno** - Modificar dados do aluno (nome e email)
- ✅ **Exclusão de Aluno** - Remover aluno do sistema
- ✅ **Busca** - Pesquisar alunos por qualquer campo
- ✅ **Validação** - Validação de formulários com regras de negócio

## 🎨 Interface

O frontend foi desenvolvido seguindo os mockups fornecidos:

- **Tela de Login**: Formulário limpo e responsivo
- **Listagem de Alunos**: Tabela com sidebar de navegação
- **Formulário de Aluno**: Modal para cadastro/edição

## 🔧 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Backend da API rodando na porta 3001

### Instalação
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Configuração
O frontend está configurado para se conectar com a API em `http://localhost:3001/api`.

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── StudentForm.vue      # Formulário de aluno
├── services/
│   └── api.ts              # Configuração da API
├── types/
│   ├── student.ts          # Tipos do aluno
│   ├── admin.ts            # Tipos do admin
│   └── vue-shim.d.ts       # Declarações Vue
├── views/
│   ├── Login.vue           # Tela de login
│   └── StudentsList.vue    # Listagem de alunos
├── App.vue                 # Componente principal
└── main.ts                 # Configuração da aplicação
```

## 🔐 Autenticação

- Token JWT armazenado no localStorage
- Interceptor automático para adicionar token nas requisições
- Redirecionamento automático para login em caso de token inválido

## 📱 Responsividade

Interface totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar
- Mobile: Interface otimizada para touch

## 🎯 Regras de Negócio Implementadas

- **RA e CPF não editáveis**: Apenas nome e email podem ser editados
- **Validação de CPF**: Máscara e validação de 11 dígitos
- **Validação de RA**: Apenas números permitidos
- **Validação de Email**: Formato de email válido
- **Confirmação de exclusão**: Modal de confirmação antes de excluir

## 🚀 Próximos Passos

- [ ] Implementar paginação na listagem
- [ ] Adicionar filtros avançados
- [ ] Implementar relatórios
- [ ] Adicionar testes unitários
- [ ] Implementar notificações toast