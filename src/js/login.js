document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Função auxiliar para exibir mensagens de erro
  const showError = (message) => {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  };

  // Recupera usuários cadastrados
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica se o usuário e senha estão corretos
  const userExists = users.some(user => user.email === email && user.password === password);

  if (userExists) {
    // Armazena o usuário logado
    const loggedInUser = users.find(user => user.email === email);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "usuarios.html";
  } else {
    showError("Email ou senha incorretos!");
  }
});
