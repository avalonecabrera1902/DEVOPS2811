let currentUserIndex = null;

// Função para renderizar os usuários na tabela
function renderUsers() {
  const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
  usersTable.innerHTML = '';
  const users = loadUsersFromStorage(); // Certifique-se de que esta função está implementada

  users.forEach((user, index) => {
    const row = usersTable.insertRow();
    row.insertCell(0).textContent = user.email;
    const actionsCell = row.insertCell(1);

    // Botão de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => {
      currentUserIndex = index;
      document.getElementById('editEmail').value = user.email;
      document.getElementById('editPassword').value = user.password;
      document.getElementById('editUserForm').style.display = 'block';
    });
    actionsCell.appendChild(editButton);

    // Botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => handleDeleteUser(index));
    actionsCell.appendChild(deleteButton);

    // Coloca os botões lado a lado
    actionsCell.style.display = 'flex';
    actionsCell.style.gap = '10px';
  });
}

// Função para carregar os usuários do armazenamento
function loadUsersFromStorage() {
  const usersJSON = localStorage.getItem('users');
  return usersJSON ? JSON.parse(usersJSON) : [];
}

// Função para salvar os usuários no armazenamento
function saveUsersToStorage(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Função para adicionar um novo usuário
function addUser(newUser) {
  const users = loadUsersFromStorage();
  users.push(newUser);
  saveUsersToStorage(users);
  renderUsers();
  displayMessage("Usuário adicionado com sucesso!", "success");
}

// Função para editar um usuário
function editUser(index, newUserData) {
  const users = loadUsersFromStorage();
  users[index] = newUserData;
  saveUsersToStorage(users);
  renderUsers();
  displayMessage("Usuário editado com sucesso!", "success");
}

// Função para excluir um usuário
function handleDeleteUser(index) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    const users = loadUsersFromStorage();
    users.splice(index, 1);
    saveUsersToStorage(users);
    renderUsers();
    displayMessage("Usuário excluído com sucesso!", "success");
  }
}

// Função para exibir mensagens de feedback
function displayMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.style.display = "block";
  messageDiv.textContent = message;
  messageDiv.style.color = type === "error" ? "red" : "green";

  // Oculta a mensagem após 3 segundos
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}

// Inicializa a renderização dos usuários ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderUsers();

  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUser = {
      email: document.getElementById('newEmail').value,
      password: document.getElementById('newPassword').value
    };
    addUser(newUser);
    addUserForm.reset();
  });

  const editUserForm = document.getElementById('editUserForm');
  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUserData = {
      email: document.getElementById('editEmail').value,
      password: document.getElementById('editPassword').value
    };
    editUser(currentUserIndex, newUserData);
    editUserForm.style.display = 'none';
  });
});