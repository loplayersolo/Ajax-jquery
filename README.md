> [!WARNING]
> # English

# CRUD with jQuery and AJAX
<table>
<td>
This project demonstrates how to build a simple web application that performs CRUD operations (Create, Read, Update, Delete) using jQuery for DOM manipulation and AJAX calls to interact with a RESTful API.   
</td>
</table>

> [!IMPORTANT]
> ## Features 
>- List registered users
>- Create new user
>- Edit existing user
>- Delete user
>- Interface updates without page reload (AJAX
>- Visual feedback for operations (success/error messages)
>## Technologies Used
> - HTML5
> - CSS3 (for layout)
> - JavaScript (jQuery 3.6.0)
> - JSON Server (REST API for testing)

## How to Run the Project
<table>
  <td>
    
### Prerequisites

- Node.js installed (to run JSON Server)

- Code editor (VSCode, Sublime, etc.)

- Web browser (Chrome, Firefox, Edge)
    


### Steps
Clone this repository or copy the files to your machine:
```
https://github.com/raicleycs/jQuery_Ajax.git
```

Install JSON Server globally:

```
npm install -g json-server
```
Create a file named db.json with the following content:
```
{
  "users": [
    { "id": 1, "name": "João", "email": "joao@example.com" },
    { "id": 2, "name": "Maria", "email": "maria@example.com" }
  ]
}
```
Navigate to the folder containing db.json: ```db.json```
```
cd db
```
Run JSON Server on port 3000:

```
json-server --watch db.json --port 3000
```

- Open the index.html file in your browser.

- Use the form to create or edit users.

- Use the "Edit" and "Delete" buttons to modify the listed users.
  
  </td>
</table>

## File Structure
<table>
  <td>
    
- [x] index.html — Main page with form and table to list users

- [x] app.js — JavaScript file containing all CRUD logic using jQuery and AJAX

- [x]  db.json — JSON Server file with initial data (see example in db/db.json) ``` db/db.json ```).

- [x]  style.css - Page styling

  </td>
</table>

> [!NOTE]
> ## Code Explanation
> - List: On page load, users are fetched using AJAX (GET /users) and displayed in the table
> - Create: Form data is sent via AJAX (POST /users)
> - Edit: User is fetched by ID (GET /users/:id) and form is pre-filled
> - Update: Updated data sent via AJAX (PUT /users/:id)
> - Delete: User deleted via AJAX (DELETE /users/:id)
> - Success/error messages are shown after each operation


> [!TIP] 
> ## Suggested Improvements for Practice
> - Add pagination for large datasets
> - Enhance UI with CSS frameworks like Bootstrap
> - Integrate real public APIs for hands-on learning
> - Add authentication and route protection


# References
- [jQuery AJAX Documentation](https://api.jquery.com/jquery.ajax/)
- [JSON Server GitHub](https://github.com/typicode/json-server)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)


<br>
<br>
<br>

> [!WARNING]
> # Português 
# CRUD com jQuery e AJAX
<table>
<td>

  Este projeto demonstra como criar uma aplicação web simples que realiza operações CRUD (Criar, Ler, Atualizar, Excluir) utilizando jQuery para manipulação do DOM e chamadas AJAX para consumir uma API RESTful.    

</td>
</table>

> [!IMPORTANT]
> ## Funcionalidades 
>- Listar usuários cadastrados
>- Criar novo usuário
>- Editar usuário existente
>- Excluir usuário
>- Atualização da interface sem recarregar a página (AJAX)
>- Feedback visual para operações (mensagens de sucesso/erro)
>## Tecnologias Utilizadas
> - HTML5
> - CSS3 (para layout)
> - JavaScript (jQuery 3.6.0)
> - JSON Server (API REST para testes)

## Como executar o projeto
<table>
  <td>
    

### Pré-requisitos

- Node.js instalado (para rodar o JSON Server)

- Editor de código (VSCode, Sublime, etc.)

- Navegador (Chrome, Firefox, Edge)
    


### Passos
Clone este repositório ou copie os arquivos para sua máquina.
```
https://github.com/raicleycs/jQuery_Ajax.git
```

Instale o JSON Server globalmente na sua máquina:

```
npm install -g json-server
```
Crie um arquivo db.json com a seguinte estrutura:

```
{
  "users": [
    { "id": 1, "name": "João", "email": "joao@example.com" },
    { "id": 2, "name": "Maria", "email": "maria@example.com" }
  ]
}
```
Vá para a pasta que contem o arquivo ```db.json```
```
cd db
```
Execute o JSON Server na porta 3000:

```
json-server --watch db.json --port 3000
```

- Abra o arquivo index.html no navegador.

- Use o formulário para criar ou editar usuários.

- Use os botões "Editar" e "Excluir" para modificar os usuários listados.
  
  </td>
</table>

## Estrutura dos arquivos
<table>
  <td>
    
- [x] index.html — Página principal com formulário e tabela para listar usuários.

- [x] app.js — Script JavaScript que contém toda a lógica do CRUD usando jQuery e AJAX.

- [x]  db.json — Arquivo para o JSON Server com dados iniciais (tem um exemplo no repositório no repositório ``` db/db.json ```).

- [x]  style.css - Estilização da página principal.

  </td>
</table>

> [!NOTE]
> ## Explicação do código
> - Listagem: Ao carregar a página, os usuários são carregados via AJAX (GET /users) e exibidos na tabela.
> - Criar: Envio de dados via AJAX (POST /users) a partir do formulário.
> - Editar: Buscar usuário pelo ID (GET /users/:id) e preencher o formulário para edição.
> - Atualizar: Envio dos dados atualizados via AJAX (PUT /users/:id).
> - Excluir: Exclusão do usuário via AJAX (DELETE /users/:id).
> - Mensagens aparecem após cada operação para informar sucesso ou erro.


> [!TIP] 
> ## Proposta de melhorias para praticar 
> - Adicionar paginação para grandes volumes de dados.
> - Melhorar interface com frameworks CSS como Bootstrap.
> - Consumir APIs reais públicas para aprendizado prático.
> - Incluir autenticação e proteção das rotas.


# Referências
- [jQuery AJAX Documentation](https://api.jquery.com/jquery.ajax/)
- [JSON Server GitHub](https://github.com/typicode/json-server)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

