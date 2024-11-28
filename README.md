# Implementação de um CRUD com Login e Integração CI/CD

## Objetivo
Nesta atividade, os alunos deverão implementar um CRUD para gerenciar usuários, com funcionalidade de login, utilizando **HTML**, **CSS**, e **JavaScript**, com testes unitários em **Jest**. A solução também deverá ser integrada com uma pipeline de **CI/CD** no **GitHub Actions**.

---

## Grupo
- **Avalone Silva Cabrera**
- **Christian Martins Teixeira**
- **Gustavo Gutierrez**
- **Joao Henrique de Oliveira**
- **Joao Victor Ferrari de Melo**

---

## Requisitos

### Frontend
- Interfaces desenvolvidas em **HTML**, com **CSS** para estilização e **JavaScript** para funcionalidade.
- Criação das seguintes interfaces:
  - **Login**
  - **Cadastro de Usuários**
  - **Edição de Usuários**
  - **Exclusão de Usuários**
- Utilização do **LocalStorage** para simular a persistência de dados.

### Funcionalidades CRUD
- **Login de Usuário**: Verificação de e-mail e senha para autenticação.
- **Cadastro de Usuários**: Registro de novos usuários com validação de:
  - E-mail único.
  - Senha segura.
- **Edição de Usuários**: Alteração de dados do usuário.
- **Exclusão de Usuários**: Remoção de registros do LocalStorage.

### Testes Unitários
- Uso do **Jest** para criar testes unitários cobrindo:
  - **Login**
  - **Cadastro**
  - **Edição**
  - **Exclusão**
- Validação da persistência de dados no **LocalStorage**.

### Integração CI/CD com GitHub Actions
- Configuração de uma pipeline no **GitHub Actions** para:
  - Executar os testes unitários automaticamente em **push** ou **pull request**.
  - Gerar relatórios sobre a execução dos testes.

---

## Passo a Passo

### 1. Criação do Repositório no GitHub
- Criar um repositório no **GitHub** para o projeto.
- Adicionar um arquivo **README.md** com instruções sobre:
  - Execução do projeto.
  - Testes unitários.
  - Pipeline CI/CD.

### 2. Estruturação do Projeto
Organizar o projeto nas seguintes pastas:
- **src/**: Arquivos HTML, CSS e JavaScript.
- **tests/**: Arquivos de testes unitários.

Criar as páginas HTML necessárias:
- **login.html**
- **cadastro.html**
- **usuarios.html**

### 3. Implementação das Funcionalidades com JavaScript
- **Login**: Verificar credenciais no **LocalStorage**.
- **Cadastro**: 
  - Registrar novos usuários.
  - Garantir validações como e-mail único.
- **Edição e Exclusão**:
  - Permitir alterações nos dados dos usuários.
  - Implementar a exclusão de usuários.

### 4. Escrita dos Testes Unitários com Jest
Cobrir as principais funcionalidades:
- Login:
  - Verificar autenticação com e-mail e senha válidos.
  - Testar comportamento com credenciais inválidas.
- Cadastro:
  - Validar a criação de usuários.
  - Garantir unicidade de e-mails.
- Edição:
  - Confirmar atualização dos dados do usuário.
- Exclusão:
  - Validar remoção de usuários do **LocalStorage**.
- Persistência:
  - Testar se os dados permanecem corretamente no **LocalStorage**.

### 5. Configuração do Pipeline CI/CD no GitHub Actions
Criar o arquivo `.github/workflows/ci.yml` com o seguinte fluxo:
1. **Evento**: Executar em **push** ou **pull request**.
2. **Passos**:
   - Instalar dependências.
   - Executar os testes unitários com **Jest**.
   - Gerar relatórios de execução.

---

## Exemplo de Configuração do Pipeline

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout do Código
      uses: actions/checkout@v3

    - name: Instalar Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Instalar Dependências
      run: npm install

    - name: Executar Testes
      run: npm test
```

---

## Entregáveis
1. **Código Fonte**:
   - Disponível no repositório GitHub.
   - Contendo frontend e testes.
2. **Pipeline CI/CD**:
   - Configurado no **GitHub Actions**.
   - Executando testes automaticamente.
3. **Relatório Final**:
   - Explicando a implementação do CRUD.
   - Descrevendo os testes unitários.
   - Detalhando o pipeline CI/CD.

---

## Critérios de Avaliação
- **Funcionalidade**: CRUD e login funcionando corretamente.
- **Cobertura de Testes**: Testes bem escritos e abrangentes.
- **Pipeline CI/CD**: Configuração funcional e automatizada no **GitHub Actions**.