<h1 align="center">MedAgenda</h1>

<h3 align="center">Sistema de Gestão de Agendamentos Médicos</h3>

<br>

<p align="center">
  <a href="#art-sobre-o-projeto">Sobre o Projeto</a> | 
  <a href="#computer-tecnologias-usadas">Tecnologias Usadas</a> | 
  <a href="#package-como-rodar-o-projeto-localmente">Como Rodar</a>
</p>

<br>

<img src="https://res.cloudinary.com/dtgimo0rh/image/upload/Screenshot_1_nxmrmd.png" alt="Imagem Ilustrativa"/>

# :art: Sobre o Projeto

Este é um projeto Front-end moderno desenvolvido para gerenciar a rotina de atendimentos de um consultório médico. O sistema oferece uma interface intuitiva para cadastro de pacientes e controle total da agenda, substituindo processos manuais por uma solução digital ágil.

O projeto utiliza **Supabase** como Backend-as-a-Service (BaaS), garantindo autenticação segura e um banco de dados PostgreSQL em tempo real, integrado a um calendário interativo poderoso.

<br>

## ✨ Features Principais

* **Gestão de Agenda Visual:** Visualização de consultas por Dia, Semana ou Mês utilizando o **FullCalendar**.
* **Controle de Pacientes:** Cadastro completo, edição e listagem de pacientes com busca inteligente (pelo ID/Nome).
* **Agendamento Inteligente:** * Criação de consultas vinculadas a pacientes existentes.
    * Edição de horários e observações.
    * Prevenção de conflitos de horário.
* **Validação Robusta:** Formulários seguros com feedback visual imediato para o usuário.
* **Notificações:** Feedback em tempo real (Toasts) para ações de sucesso ou erro.

# :computer: Tecnologias Usadas

### Core & Interface
* **React 19** (A versão mais recente da biblioteca)
* **Vite** (Build tool ultra-rápida)
* **TypeScript** (Tipagem estática para segurança do código)
* **Tailwind CSS v4** (Estilização utility-first de última geração)
* **Lucide React** (Ícones modernos e leves)

### Funcionalidades & Lógica
* **Supabase** (Banco de dados, Auth e API)
* **FullCalendar** (Gestão complexa de calendário e eventos)
* **React Hook Form** (Gerenciamento de formulários performático)
* **Yup** (Schema validation para garantir a integridade dos dados)
* **React Router v7** (Roteamento da aplicação)
* **React Toastify** (Notificações em tela)

### Qualidade de Código
* **Biome** (Formatador e Linter de alta performance)
* **ESLint** (Padronização de código)

# :package: Como Rodar o Projeto Localmente

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/SEU_USUARIO/MedAgenda.git](https://github.com/SEU_USUARIO/MedAgenda.git)
    cd MedAgenda
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    # ou
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto seguindo o modelo abaixo.

4.  **Rodando o projeto:**
    ```sh
    npm run dev
    # ou
    yarn dev
    ```

5.  **Acesse:**
    O projeto estará disponível em `http://localhost:5173`.

## 📦 Configuração de Variáveis (.env)

Para o projeto conectar corretamente ao banco de dados, crie um arquivo `.env` na raiz com as chaves do seu projeto no Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_publica
```

# :bug: Problemas

Sinta-se à vontade para registrar problemas caso encontre bugs ou tenha sugestões de melhoria!

<p align="center"> Feito com 💜 por <strong>Elton Vitoretti Jr</strong> sob tutoria do DevClub.

Entre em contato: <a href="https://www.google.com/search?q=https://www.linkedin.com/in/elton-vitoretti-jr">LinkedIn</a> </p>
