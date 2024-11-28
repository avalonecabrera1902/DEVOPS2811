document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Função auxiliar para exibir mensagens de erro
  const showError = (message) => {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  };

  // Validação de senha
  if (password !== confirmPassword) {
    showError("As senhas não coincidem!");
    return;
  }

  // Recupera usuários cadastrados
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica se o e-mail já está cadastrado
  if (users.some(user => user.email === email)) {
    showError("Este e-mail já está cadastrado!");
    return;
  }

  // Adiciona novo usuário
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuário cadastrado com sucesso!");
  window.location.href = "login.html";
});