document.addEventListener("DOMContentLoaded", function () {
  init();

  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    handleAddUser();
  });

  document.getElementById("logoutButton").addEventListener("click", handleLogout);
});

// Inicializa a aplicação
function init() {
  renderUsers();
}

// Renderiza a tabela de usuários
function renderUsers() {
  const users = getUsersFromStorage();
  const usersTableBody = document.querySelector("#usersTable tbody");
  usersTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = usersTableBody.insertRow();
    row.innerHTML = `
      <td>${user.email}</td>
      <td>
        <button onclick="handleDeleteUser(${index})">Excluir</button>
      </td>
    `;
  });
}

// Recupera usuários do localStorage
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Salva usuários no localStorage
function saveUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Adiciona um novo usuário
function handleAddUser() {
  const email = document.getElementById("newEmail").value.trim();
  const password = document.getElementById("newPassword").value;

  if (!email || !password) {
    displayMessage("Preencha todos os campos!", "error");
    return;
  }

  const users = getUsersFromStorage();
  users.push({ email, password });
  saveUsersToStorage(users);

  renderUsers();
  displayMessage("Usuário adicionado com sucesso!", "success");
  document.getElementById("addUserForm").reset(); // Limpa o formulário
}

// Exclui um usuário pelo índice
function handleDeleteUser(index) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    const users = getUsersFromStorage();
    users.splice(index, 1);
    saveUsersToStorage(users);
    renderUsers();
    displayMessage("Usuário excluído com sucesso!", "success");
  }
}

// Realiza logout
function handleLogout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Exibe mensagens de feedback
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
