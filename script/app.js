 $("#loginForm").on("submit", function(event) {
      event.preventDefault(); // Evita envio padrão

      const email = $("#email").val();
      const senha = $("#senha").val();

      $.ajax({
        url: "login.php",  // ou sua URL de API
        type: "POST",
        data: {
          email: email,
          senha: senha
        },
        success: function(resposta) {
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

function listUsers() {
  const currentRole = $('#userRole').val();
  const currentUserId = parseInt($('#currentUserId').val());

  $.ajax({
    url: API_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let rows = "";
      data.forEach(user => {
        const isSelf = user.id === currentUserId;
        const isAdmin = currentRole === "ADM";
        const isSupervisor = currentRole === "Supervisor";

        let canSee = false;
        let canEdit = false;
        let canDelete = false;

        if (isAdmin) {
          canSee = canEdit = canDelete = true;
        } else if (isSupervisor) {
          canSee = true;
          canEdit = isSelf;
        } else {
          canSee = isSelf;
          canEdit = isSelf;
        }

        if (canSee) {
          rows += `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
  ${isAdmin ? `
    <select class="roleSelect" data-id="${user.id}">
      <option value="ADM" ${user.role === 'ADM' ? 'selected' : ''}>ADM</option>
      <option value="Supervisor" ${user.role === 'Supervisor' ? 'selected' : ''}>Supervisor</option>
      <option value="Especialista" ${user.role === 'Especialista' || !user.role ? 'selected' : ''}>Especialista</option>
    </select>
  ` : user.role || 'Especialista'}
</td>

            <td>`;
          if (canEdit) {
            rows += `<button class="editBtn" data-id="${user.id}">Editar</button>`;
          }
          if (canDelete) {
            rows += `<button class="deleteBtn" data-id="${user.id}">Excluir</button>`;
          }
          rows += `</td></tr>`;
        }
      });
      $('#userList').html(rows);
    },
    error: function () {
      showMessage("Erro ao carregar usuários.", true);
    }
  });
}

// Criar ou atualizar usuário
$('#formUser').submit(function (e) {
  e.preventDefault();
  const id = $('#userId').val();
  const name = $('#name').val();
  const email = $('#email').val();

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

      const userData = { name, email, role };

      $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function () {
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
