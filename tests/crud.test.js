// Configuração inicial para simular o LocalStorage
beforeEach(() => {
  let store = {};

  global.localStorage = {
    clear: () => {
      store = {};
    },
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
});

function saveUsersToStorage(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromStorage() {
  const usersJSON = localStorage.getItem('users');
  return usersJSON ? JSON.parse(usersJSON) : [];
}

describe("CRUD de Usuários", () => {
  test("Deve cadastrar um novo usuário", () => {
    const newUser = { email: "teste@teste.com", password: "123456" };
    const users = loadUsersFromStorage();

    users.push(newUser);
    saveUsersToStorage(users);

    expect(localStorage.getItem("users")).toBe(JSON.stringify([newUser]));
  });

  test("Deve realizar login com e-mail e senha corretos", () => {
    const email = "teste@teste.com";
    const password = "123456";
    const users = [{ email, password }];

    saveUsersToStorage(users);

    const user = users.find(user => user.email === email && user.password === password);

    expect(user).toBeTruthy();
    expect(user.email).toBe(email);
  });

  test("Deve editar o usuário existente", () => {
    const users = [{ email: "teste@teste.com", password: "123456" }];
    saveUsersToStorage(users);

    const updatedUser = { email: "teste@teste.com", password: "novaSenha" };
    users[0] = updatedUser;
    saveUsersToStorage(users);

    expect(localStorage.getItem("users")).toBe(JSON.stringify([updatedUser]));
  });

  test("Deve excluir o usuário existente", () => {
    const users = [{ email: "teste@teste.com", password: "123456" }];
    saveUsersToStorage(users);

    users.splice(0, 1);
    saveUsersToStorage(users);

    expect(localStorage.getItem("users")).toBe(JSON.stringify([]));
  });

  test("Deve verificar a persistência dos dados no LocalStorage", () => {
    const users = [{ email: "teste@teste.com", password: "123456" }];
    saveUsersToStorage(users);

    expect(localStorage.getItem("users")).toBe(JSON.stringify(users));
  });

  test("Deve verificar erro ao tentar cadastrar um usuário com e-mail existente", () => {
    const users = [{ email: "teste@teste.com", password: "123456" }];
    saveUsersToStorage(users);

    const newUser = { email: "teste@teste.com", password: "789123" };
    const userExists = users.some(user => user.email === newUser.email);

    expect(userExists).toBe(true);
  });

  test("Deve verificar se as senhas coincidem ao cadastrar", () => {
    const password = "123456";
    const confirmPassword = "123456";

    expect(password).toBe(confirmPassword);
  });

  test("Deve atualizar um usuário existente", () => {
    const users = [
      { email: "teste1@teste.com", password: "123456" },
      { email: "teste2@teste.com", password: "789123" }
    ];
    saveUsersToStorage(users);

    const updatedUser = { email: "teste2@teste.com", password: "novaSenha123" };
    const userIndex = users.findIndex(user => user.email === updatedUser.email);

    // Atualiza o usuário
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsersToStorage(users);
    }

    const updatedUsers = loadUsersFromStorage();
    expect(updatedUsers[userIndex]).toEqual(updatedUser);
  });

});
