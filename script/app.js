
    const API_URL = "http://localhost:3000/users";

function showMessage(message, isError = false) {
  const msg = $('#message');
  msg.text(message);
  msg.css('color', isError ? 'red' : 'green');
  setTimeout(() => msg.text(''), 3000);
}

function getCurrentUser() {
  const currentUserId = parseInt($('#currentUserId').val());
  return $.get(API_URL + '/' + currentUserId);
}
$("#home").on("submit", function(event) {
  event.preventDefault(); // Evita envio padrão

  const email = $("#email").val();
  const senha = $("#senha").val();

  $.ajax({
    url: API_URL,  // ou sua URL de API
    type: "GET",
    datatype: "json",
    
    success: function(resposta) {
      resposta.forEach(user => {
        if (user.email === email && user.senha === senha) {
          localStorage.setItem("userId", user.id);
          
          alert(user.id);
          window.location.href = "index.html"; // Redireciona ao index
          return;
        }
      })
      if (resposta === "ok") {

        window.location.href = "index.html"; // Redireciona ao index
      } else {
        $("#mensagem").text("Login inválido!");
      }
    },
    error: function() {
      $("#mensagem").text("Erro ao conectar com o servidor.");
    }
  });
});
function listUsers() {
  
  const currentUserId = localStorage.getItem("userId");
  

  $.ajax({
    url: API_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let rows = "";
      data.forEach(user => {
        const isSelf = user.id === currentUserId;
        console.log(isSelf);
        if (isSelf) {
    
          let currentRole = user.role;
          if (currentRole === "ADM"){
            data.forEach(listar => {                    
              rows += `<tr>
            <td>${listar.name}</td>
            <td>${listar.email}</td>
            <td>
  ${user.role === 'ADM' ? `
    <select class="roleSelect" data-id="${listar.id}">
      <option value="ADM" ${listar.role === 'ADM' ? 'selected' : ''}>ADM</option>
      <option value="Supervisor" ${listar.role === 'Supervisor' ? 'selected' : ''}>Supervisor</option>
      <option value="Especialista" ${listar.role === 'Especialista' || !listar.role ? 'selected' : ''}>Especialista</option>
    </select>
  ` : listar.role || 'Especialista'}
</td>

            <td>`;
            rows += `<button class="editBtn" data-id="${listar.id}">Editar</button>`;
            rows += `<button class="deleteBtn" data-id="${listar.id}">Excluir</button>`;
             rows += `</td></tr>`;

            });


          }else if (currentRole === "Supervisor"){
            data.forEach(listar => {
              rows += `<tr>
                <td>${listar.name}</td>
                <td>${listar.role || 'Supervisor'}</td>
                <td>`;
              if (listar.id === currentUserId) {
                rows += `<button class="editBtn" data-id="${listar.id}">Editar</button>`;
            rows += `<button class="deleteBtn" data-id="${listar.id}">Excluir</button>`;

              }
                
           
                rows += `</td></tr>`;
              
            });

            
          } else if (currentRole === "Especialista"){rows += `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
             <td>`;
            rows += `<button class="editBtn" data-id="${user.id}">Editar</button>`;
            rows += `<button class="deleteBtn" data-id="${user.id}">Excluir</button>`;
             rows += `</td></tr>`;
            
            
            
            
          
          }else{
            alert("Usuário sem funnção");
          }
        }
            $('#userList').html(rows);
        });
      
    },
    error: function () {
      showMessage("Erro ao carregar usuários.", true);
    }
  });
}

// Criar ou atualizar usuário
$('#formUser').submit(function (e) { alert("cadastrado com sucesso");
  e.preventDefault();
  const id = $('#userId').val();
  const name = $('#name').val();
  const email = $('#email').val();
  const senha = $('#senha').val();

  if (id) {
    // PUT - Atualizar usuário
    $.get(API_URL + '/' + id, function (user) {
      const updatedUser = {
        ...user,
        name,
        email
      };

      $.ajax({
        url: API_URL + '/' + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedUser),
        success: function () {
          showMessage("Usuário atualizado com sucesso!");
          $('#formUser')[0].reset();
          listUsers();
        },
        error: function () {
          showMessage("Erro ao atualizar usuário.", true);
        }
      });
    });
  } else {
    // POST - Criar novo usuário
    let role = "Especialista";
    $.get(API_URL, function(users) {
      if (users.length === 0) {
        role = "ADM";
      }

      const userData = { name, email, role, senha };

      $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success:  function () {
          window.location.href = "login.html";
          showMessage("Usuário criado com sucesso!");
          $('#formUser')[0].reset();
          listUsers();
        },
        error: function () {
          showMessage("Erro ao criar usuário.", true);
        }
      });
    });
  }
});

// Editar
$('#userList').on('click', '.editBtn', function () {
  const id = $(this).data('id');
  $.get(API_URL + '/' + id, function (user) {
    $('#userId').val(user.id);
    $('#name').val(user.name);
    $('#email').val(user.email);
  });
});

// Excluir
$('#userList').on('click', '.deleteBtn', function () {
  const id = $(this).data('id');
  $.ajax({
    url: API_URL + '/' + id,
    method: "DELETE",
    success: function () {
      showMessage("Usuário excluído com sucesso!");
      listUsers();
    },
    error: function () {
      showMessage("Erro ao excluir usuário.", true);
    }
  });
});
// Quando o ADM muda a função de alguém
$('#userList').on('change', '.roleSelect', function () {
    const id = $(this).data('id');
    const newRole = $(this).val();
  
    $.get(API_URL + '/' + id, function(user) {
      const updatedUser = {
        ...user,
        role: newRole
      };
  
      $.ajax({
        url: API_URL + '/' + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedUser),
        success: function () {
          showMessage("Função atualizada!");
          listUsers();
        },
        error: function () {
          showMessage("Erro ao atualizar função.", true);
        }
      });
    });
  });
  

// Atualizar lista ao mudar a função simulada
$('#userRole').change(listUsers);

// Carregar ao iniciar
$(document).ready(function () {
  listUsers();
});
