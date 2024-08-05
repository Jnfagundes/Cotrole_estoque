// Função para salvar usuário no localStorage
function saveUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Usuário já existe.');
        return false;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário cadastrado com sucesso!');
    return true;
}

// Função para verificar login
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        window.location.href = '/index.html'; // Redireciona para a página principal
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

// Event listener para cadastro
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (saveUser(username, password)) {
            window.location.href = '/login.html';
        }
    });
}

// Event listener para login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        loginUser(username, password);
    });
}